import {
  REMOVE,
  CHECK,
  UNCHECK,
  ADD,
  STORE_BOUGHT,
  CHANGE_ORDER,
} from '../Actions/ActionTypes';

const reducer = (state = {}, action) => {
  const { items } = state;
  const { type, item } = action;
  switch (type) {
    case ADD: {
      return {
        ...state,
        items: [item, ...items],
      };
    }

    case CHECK: {
      const newArray = items.filter((i) => i.id !== item.id);
      item.check = !item.check;
      newArray.push(item);

      return {
        ...state,
        items: newArray,
      };
    }

    case UNCHECK: {
      const newArray = items.filter((i) => i.id !== item.id);

      const checkedItems = newArray.filter((i) => i.check);
      const uncheckedItems = newArray.filter((i) => !i.check);
      item.check = !item.check;
      const collect = [...uncheckedItems, item, ...checkedItems];

      return {
        ...state,
        items: collect,
      };
    }

    case REMOVE: {
      return {
        ...state,
        items: items.filter((i) => i.id !== item.id),
      };
    }

    case STORE_BOUGHT: {
      return {
        ...state,
        items: items.filter((i) => i.check === false),
      };
    }
    case CHANGE_ORDER: {
      return {
        ...state,
        items: action.items.data,
      };
    }
    default:
      return state;
  }
};

export default reducer;
