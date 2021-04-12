import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title } from 'react-native-paper';
import PropTypes from 'prop-types';
import { checkItem } from '../store/Actions/ActionCreators';
import CustomMenu from './CustomMenu';

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  // eslint-disable-next-line react-native/no-color-literals
  checked: {
    color: '#808080',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    backgroundColor: '#f4f4f4',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customMenu: {
    alignSelf: 'flex-end',
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
      style={item.check ? { ...styles.checked, ...styles.card } : styles.card}
      onPress={() => {
        dispatch(checkItem(item));
      }}
      onLongPress={drag}
      testID='listItem'
    >
      <Card.Content style={styles.cardContent}>
        <Title style={item.check ? styles.checked : {}}>{item.product}</Title>
        <View style={styles.customMenu}>
          <CustomMenu
            visible={visible}
            closeMenu={closeMenu}
            openMenu={openMenu}
            item={item}
            dispatch={dispatch}
          />
        </View>
      </Card.Content>
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
