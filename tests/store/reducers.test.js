import {
  ADD,
  CHECK,
  REMOVE,
  STORE_BOUGHT,
  CHANGE_ORDER,
} from '../../src/store/Actions/ActionTypes';
import reducer from '../../src/store/Reducers/RootReducer';

describe('items reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should add item', () => {
    const item = {
      id: Date.now(),
      product: 'Coffee',
      amount: 1,
      check: false,
    };
    expect(reducer({ items: [] }, { type: ADD, item })).toEqual({
      items: [item],
    });
  });

  it('should check item', () => {
    const item = {
      id: Date.now(),
      product: 'Coffee',
      amount: 1,
      check: false,
    };
    expect(reducer({ items: [item] }, { type: CHECK, item })).toEqual({
      items: [item],
    });
  });

  it('should remove item', () => {
    const item = {
      id: Date.now(),
      product: 'Coffee',
      amount: 1,
      check: false,
    };
    expect(reducer({ items: [item] }, { type: REMOVE, item })).toEqual({
      items: [],
    });
  });

  it('should store checked items', () => {
    const item = {
      id: Date.now(),
      product: 'Coffee',
      amount: 1,
      check: false,
    };
    expect(reducer({ items: [item] }, { type: STORE_BOUGHT, item })).toEqual({
      items: [item],
    });
    item.check = true;
    expect(reducer({ items: [item] }, { type: STORE_BOUGHT, item })).toEqual({
      items: [],
    });
  });

  it('should update the order items', () => {
    const items = [
      { id: Date.now(), product: 'Coffee', amount: 1, check: false },
      { id: Date.now(), product: 'Tea', amount: 1, check: false },
      { id: Date.now(), product: 'Cookies', amount: 1, check: false },
      { id: Date.now(), product: 'Bread', amount: 1, check: false },
    ];
    const newItems = items.reverse();
    expect(
      reducer({ items }, { type: CHANGE_ORDER, items: { data: newItems } }),
    ).toEqual({
      items: newItems,
    });
  });
});
