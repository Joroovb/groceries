import configureStore from 'redux-mock-store';
import {
  storeItems,
  addItem,
  removeItem,
  checkItem,
  changeOrder,
} from '../../src/store/Actions/ActionCreators';

const mockStore = configureStore([]);

describe('Action creators', () => {
  it('should add items', () => {
    // Initialie test item
    const item = { id: Date.now(), product: 'Coffee', amount: 1, check: false };

    // Initialize mockstore with empty state
    const initialState = { items: [] };
    const store = mockStore(initialState);

    // Dispatch the action
    store.dispatch(addItem(item));

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = { item, type: 'ADD' };
    expect(actions).toEqual([expectedPayload]);
  });

  it('should remove items', () => {
    // Initialie test item
    const item = { id: Date.now(), product: 'Coffee', amount: 1, check: false };

    // Initialize mockstore with empty state
    const initialState = { items: [item] };
    const store = mockStore(initialState);

    // Dispatch the action
    store.dispatch(removeItem(item));

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = { item, type: 'REMOVE' };
    expect(actions).toEqual([expectedPayload]);
  });

  it('should check items', () => {
    // Initialie test item
    const item = { id: Date.now(), product: 'Coffee', amount: 1, check: false };

    // Initialize mockstore with empty state
    const initialState = { items: [] };
    const store = mockStore(initialState);

    // Dispatch the action
    store.dispatch(checkItem(item));

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = { item, type: 'CHECK' };
    expect(actions).toEqual([expectedPayload]);
  });

  it('should store items', () => {
    // Initialize mockstore with empty state
    const initialState = { items: [] };
    const store = mockStore(initialState);

    // Dispatch the action
    store.dispatch(storeItems());

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = { type: 'STORE_BOUGHT' };
    expect(actions).toEqual([expectedPayload]);
  });

  it('should change item order', () => {
    // Initialie test item array
    const items = [
      { id: Date.now(), product: 'Coffee', amount: 1, check: false },
      { id: Date.now(), product: 'Coffee', amount: 1, check: false },
    ];

    // Initialize mockstore with empty state
    const initialState = { items: [] };
    const store = mockStore(initialState);

    // Dispatch the action
    store.dispatch(changeOrder(items));

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = { type: 'CHANGE_ORDER', items };
    expect(actions).toEqual([expectedPayload]);
  });
});
