import * as actionType from "../actions/actionTypes";

const initState = {
  orders: null,
  errors: null,
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_ORDERS_SUCCESS:
      state.orders = null;
      return { ...state, orders: action.orders, errors: null };

    case actionType.GET_ORDERS_FAIL:
      return {
        ...state,
        errors: action.errors,
      };

    default:
      return state;
  }
};

export default orderReducer;
