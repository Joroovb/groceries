import {
  ADD,
  CHECK,
  UNCHECK,
  REMOVE,
  STORE_BOUGHT,
  CHANGE_ORDER,
} from './ActionTypes';

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

export const uncheckItem = (item) => ({
  type: UNCHECK,
  item,
});

export const storeItems = () => ({
  type: STORE_BOUGHT,
});

export const changeOrder = (items) => ({
  type: CHANGE_ORDER,
  items,
});
