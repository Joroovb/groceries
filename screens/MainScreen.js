import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { Card, FAB, Menu, IconButton } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import {
  addItem,
  checkItem,
  removeItem,
  storeItems,
  changeOrder,
} from '../store/Actions/ActionCreators';
import DraggableFlatList from 'react-native-draggable-flatlist';

const ListItem = ({ item, dispatch, drag, isActive }) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <Card
      elevation={isActive ? 6 : 3}
      style={{
        margin: 10,
      }}
      onPress={() => dispatch(checkItem(item))}
      onLongPress={drag}
    >
      <Card.Title
        titleStyle={
          item.check
            ? {
                color: 'grey',
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
              }
            : {}
        }
        title={item.product}
        right={(props) => (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton {...props} icon='dots-vertical' onPress={openMenu} />
            }
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

const TextInputCard = ({ items, dispatch }) => {
  const [text, setText] = useState('');
  return (
    <Card elevation={3} style={{ margin: 10 }}>
      <Card.Content>
        <TextInput
          placeholder={'Enter new product'}
          value={text}
          onChangeText={(txt) => setText(txt)}
          blurOnSubmit={false}
          style={{ fontSize: 19, fontWeight: '500' }}
          onSubmitEditing={() => {
            text.length > 1
              ? dispatch(
                  addItem({
                    id: Date.now(),
                    product: text,
                    amount: 1,
                    check: false,
                  }),
                )
              : {};
            setText('');
          }}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

const MainScreen = ({ items, dispatch }) => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
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
        onDragEnd={(items) => dispatch(changeOrder(items))}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <TextInputCard items={items} dispatch={dispatch} />
        }
      />
      <FAB
        style={styles.fab}
        icon='check'
        onPress={() => dispatch(storeItems())}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const { items } = state;
  return { items };
};

export default connect(mapStateToProps)(MainScreen);
