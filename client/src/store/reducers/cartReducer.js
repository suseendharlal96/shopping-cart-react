import * as actionType from "../actions/actionTypes";

const initState = {
  cart: null,
  errors: null,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_CART_SUCCESS:
      state.cart = null;
      return {
        ...state,
        cart: action.cart,
      };

    case actionType.GET_CART_FAIL:
      return {
        ...state,
        errors: action.errors,
      };

    case actionType.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        cart: state.cart.filter((c) => c._id !== action.id),
      };

    case actionType.PAYMENT_SUCCESS:
      return {
        ...state,
        cart: state.cart.filter((c) => c._id !== action.id),
      };

    default:
      return state;
  }
};

export default cartReducer;
