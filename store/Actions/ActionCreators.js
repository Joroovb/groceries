import { ADD, CHECK, REMOVE, STORE_BOUGHT, CHANGE_ORDER } from './ActionTypes';

export const addItem = (item) => ({
  type: ADD,
  item,
});

export const removeItem = (item) => ({
  type: REMOVE,
  item,
});

export const checkItem = (item) => ({
  type: CHECK,
  item,
});

export const storeItems = () => ({
  type: STORE_BOUGHT,
});

export const changeOrder = (items) => ({
  type: CHANGE_ORDER,
  items,
});
