import * as actionType from "../actions/actionTypes";

export const getOrdersSuccess = (orders) => ({
  type: actionType.GET_ORDERS_SUCCESS,
  orders,
});

export const getOrdersFail = (errors) => ({
  type: actionType.GET_ORDERS_FAIL,
  errors,
});

export const getOrders = (token) => ({
  type: actionType.GET_ORDERS_SAGA,
  token,
});
