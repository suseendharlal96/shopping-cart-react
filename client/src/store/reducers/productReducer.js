import * as actionType from "../actions/actionTypes";
const initState = {
  products: null,
  error: null,
  paginationInfo: null,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCTS_SUCCESS:
      state.products = null;
      return {
        ...state,
        products: action.data.products,
        paginationInfo: action.data.paginationInfo,
        error: null,
      };

    case actionType.GET_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.UPDATE_PRODUCTS_SUCCESS:
      console.log(1);
      return {
        ...state,
        products: [action.product, ...state.products],
        error: null,
      };

    case actionType.UPDATE_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: state.products.filter((p) => p._id !== action.id),
      };

    default:
      return state;
  }
};

export default productReducer;
