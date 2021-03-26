import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { Card, FAB, Menu, IconButton } from 'react-native-paper';
import Constants from 'expo-constants';
import DraggableFlatList from 'react-native-draggable-flatlist';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import {
  addItem,
  checkItem,
  removeItem,
  storeItems,
  changeOrder,
} from '../store/Actions/ActionCreators';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  card: {
    margin: 10,
  },
  textInput: { fontSize: 19, fontWeight: '500' },
  // eslint-disable-next-line react-native/no-color-literals
  checked: {
    color: '#808080',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  sav: { flex: 1, marginTop: Constants.statusBarHeight },
});

const ListItem = ({ item, dispatch, drag, isActive }) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => {
    setVisible(true);
  };
  const closeMenu = () => {
    setVisible(false);
  };
  return (
    <Card
      elevation={isActive ? 6 : 3}
      style={styles.card}
      onPress={() => {
        dispatch(checkItem(item));
      }}
      onLongPress={drag}
      testID='listItem'
    >
      <Card.Title
        titleStyle={item.check ? styles.checked : {}}
        title={item.product}
        right={() => (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton icon='dots-vertical' onPress={openMenu} />}
          >
            <Menu.Item
              onPress={() => dispatch(removeItem(item))}
              icon='delete'
              title='Delete'
            />
          </Menu>
        )}
      />
    </Card>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    product: PropTypes.string,
    amount: PropTypes.number,
    check: PropTypes.bool,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  drag: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

const inputSchema = yup.string().required().min(2);

const TextInputCard = ({ dispatch }) => {
  const [text, setText] = useState('');

  const submitHandler = () => {
    inputSchema.isValid(text).then((valid) => {
      if (valid) {
        dispatch(
          addItem({
            id: Date.now(),
            product: text,
            amount: 1,
            check: false,
          }),
        );
        setText('');
      }
    });
  };

  return (
    <Card elevation={3} style={styles.card}>
      <Card.Content>
        <TextInput
          placeholder='Enter new product'
          value={text}
          onChangeText={(txt) => {
            setText(txt);
          }}
          blurOnSubmit={false}
          style={styles.textInput}
          onSubmitEditing={submitHandler}
        />
      </Card.Content>
    </Card>
  );
};

TextInputCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const MainScreen = ({ items, dispatch }) => (
  <SafeAreaView style={styles.sav}>
    <DraggableFlatList
      data={items}
      renderItem={(item) => (
        <ListItem
          dispatch={dispatch}
          drag={item.drag}
          isActive={item.isActive}
          item={item.item}
        />
      )}
      bounces={false}
      onDragEnd={(data) => dispatch(changeOrder(data))}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={<TextInputCard items={items} dispatch={dispatch} />}
    />
    <FAB
      style={styles.fab}
      icon='check'
      onPress={() => {
        dispatch(storeItems());
      }}
      testID='FAB'
    />
  </SafeAreaView>
);

MainScreen.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      product: PropTypes.string,
      amount: PropTypes.number,
      check: PropTypes.bool,
    }),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { items } = state;
  return { items };
};

export default connect(mapStateToProps)(MainScreen);
