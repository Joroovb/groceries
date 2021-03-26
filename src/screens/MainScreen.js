import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card, FAB, Menu, IconButton } from 'react-native-paper';
import Constants from 'expo-constants';
import DraggableFlatList from 'react-native-draggable-flatlist';
import PropTypes from 'prop-types';
import {
  checkItem,
  removeItem,
  storeItems,
  changeOrder,
} from '../store/Actions/ActionCreators';
import TextInputCard from '../components/TextInputCard';

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
      ListHeaderComponent={<TextInputCard dispatch={dispatch} />}
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
