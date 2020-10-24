import { takeEvery, takeLatest } from "redux-saga/effects";

import * as actionType from "../actions/actionTypes";
import { authInitSaga } from "./authSaga";
import { getOrdersSaga } from "./orderSaga";
import {
  getCartSaga,
  addToCartSaga,
  removeFromCartSaga,
  paymentSaga,
} from "./cartSaga";

import {
  getProductsSaga,
  updateProductSaga,
  deleteProductSaga,
} from "./productSaga";

export function* watchAuth() {
  yield takeEvery(actionType.AUTH_START_SAGA, authInitSaga);
}

export function* watchProducts() {
  yield takeLatest(actionType.GET_PRODUCTS_SAGA, getProductsSaga);
  yield takeLatest(actionType.UPDATE_PRODUCT_SAGA, updateProductSaga);
  yield takeLatest(actionType.DELETE_PRODUCT_SAGA, deleteProductSaga);
}

export function* watchCart() {
  yield takeLatest(actionType.GET_CART_SAGA, getCartSaga);
  yield takeLatest(actionType.ADD_CART_SAGA, addToCartSaga);
  yield takeLatest(actionType.REMOVE_FROM_CART_SAGA, removeFromCartSaga);
  yield takeLatest(actionType.PAYMENT_SAGA, paymentSaga);
}

export function* watchOrders() {
  yield takeLatest(actionType.GET_ORDERS_SAGA, getOrdersSaga);
}
