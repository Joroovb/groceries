import {
  REMOVE,
  CHECK,
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
        items: [...items, item],
      };
    }

    case CHECK: {
      const index = items.findIndex((i) => i.id === item.id);
      const newArray = [...items];
      newArray[index].check = !newArray[index].check;
      return {
        ...state,
        items: newArray,
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
        items: items.filter((i) => i.check == false),
      };
    }
    case CHANGE_ORDER: {
      return {
        ...state,
        items: action.items.data,
      };
    }
  }

  return state;
};

export default reducer;
