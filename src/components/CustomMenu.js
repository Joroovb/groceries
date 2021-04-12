import React from 'react';
import { Menu, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import { removeItem } from '../store/Actions/ActionCreators';

const CustomMenu = ({ visible, closeMenu, openMenu, item, dispatch }) => (
  <Menu
    visible={visible}
    onDismiss={closeMenu}
    testID='menu'
    accessibilityLabel='menu'
    anchor={
      // eslint-disable-next-line react/jsx-wrap-multilines
      <IconButton
        icon='dots-vertical'
        onPress={openMenu}
        testID='menu-button'
        accessibilityLabel='menu-button'
      />
    }
  >
    <Menu.Item
      onPress={() => dispatch(removeItem(item))}
      icon='delete'
      title='Delete'
    />
  </Menu>
);

CustomMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    product: PropTypes.string,
    amount: PropTypes.number,
    check: PropTypes.bool,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default CustomMenu;
