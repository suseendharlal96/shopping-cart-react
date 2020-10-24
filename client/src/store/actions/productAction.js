import * as actionTypes from "./actionTypes";

export const getProductsSuccess = (data) => ({
  type: actionTypes.GET_PRODUCTS_SUCCESS,
  data,
});

export const getProductsFail = (error) => ({
  type: actionTypes.GET_PRODUCTS_FAIL,
  error,
});

export const getProducts = (activePage, currentLimit, token) => ({
  type: actionTypes.GET_PRODUCTS_SAGA,
  activePage,
  currentLimit,
  token,
});

export const updateProductSuccess = (product) => ({
  type: actionTypes.UPDATE_PRODUCTS_SUCCESS,
  product,
});

export const updateProductFail = (error) => ({
  type: actionTypes.UPDATE_PRODUCTS_FAIL,
  error,
});

export const updateProduct = (
  product,
  prodId,
  token,
  activePage,
  currentLimit
) => ({
  type: actionTypes.UPDATE_PRODUCT_SAGA,
  product,
  prodId,
  token,
  activePage,
  currentLimit,
});

export const deleteProduct = (id, token, activePage, currentLimit) => ({
  type: actionTypes.DELETE_PRODUCT_SAGA,
  id,
  token,
  activePage,
  currentLimit,
});
