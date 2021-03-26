import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Menu, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import { checkItem, removeItem } from '../store/Actions/ActionCreators';

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  // eslint-disable-next-line react-native/no-color-literals
  checked: {
    color: '#808080',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});

const ListItem = ({ item, dispatch, drag, isActive }) => {
  const [visible, setVisible] = useState(false);
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

export default ListItem;
