import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import Constants from 'expo-constants';
import DraggableFlatList from 'react-native-draggable-flatlist';
import PropTypes from 'prop-types';
import { storeItems, changeOrder } from '../store/Actions/ActionCreators';
import TextInputCard from '../components/TextInputCard';
import ListItem from '../components/ListItem';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  sav: { flex: 1, marginTop: Constants.statusBarHeight },
});

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
