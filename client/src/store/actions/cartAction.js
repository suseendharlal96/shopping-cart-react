import * as actionType from "./actionTypes";

export const getCartSuccess = (cart) => ({
  type: actionType.GET_CART_SUCCESS,
  cart,
});

export const getCartFail = (errors) => ({
  type: actionType.GET_CART_FAIL,
  errors,
});

export const getCart = (token, userId) => ({
  type: actionType.GET_CART_SAGA,
  token,
  userId,
});

export const addToCart = (product, token) => ({
  type: actionType.ADD_CART_SAGA,
  product,
  token,
});

export const removeFromCartSuccess = (id) => ({
  type: actionType.REMOVE_FROM_CART_SUCCESS,
  id,
});

export const removeFromCart = (id, token) => ({
  type: actionType.REMOVE_FROM_CART_SAGA,
  id,
  token,
});

export const paymentSuccess = (id) => ({
  type: actionType.PAYMENT_SUCCESS,
  id,
});

export const makePayment = (paymentToken, product, token) => ({
  type: actionType.PAYMENT_SAGA,
  paymentToken,
  product,
  token,
});
