import axios from "axios";
import { put } from "redux-saga/effects";
import { toast } from "react-toastify";

import * as actions from "../actions/index";
toast.configure();

export function* getProductsSaga({ activePage, currentLimit, token }) {
  try {
    const res = yield axios.get(
      `https://node-shop-cart.herokuapp.com/products?page=${activePage}&limit=${currentLimit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data && res.data.products) {
      yield put(actions.getProductsSuccess(res.data));
    }
  } catch (err) {
    yield put(
      actions.getProductsFail(
        "There was some trouble fetching.Please try again!"
      )
    );
  }
}

export function* updateProductSaga({
  product,
  prodId,
  token,
  activePage,
  currentLimit,
}) {
  let url = "https://node-shop-cart.herokuapp.com/products/";
  let ax = axios.post(url, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (prodId) {
    url = `https://node-shop-cart.herokuapp.com/products/${prodId}`;
    ax = axios.patch(url, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  try {
    const res = yield ax;
    toast.success("Product updated successfully");
    res.data && res.data.product
      ? yield put(actions.getProducts(activePage, currentLimit, token)) // update
      : yield put(actions.updateProductSuccess(res.data.createdProduct)); //create
  } catch (err) {
    yield put(
      actions.updateProductFail("There was some trouble.Please try again!")
    );
  }
}

export function* deleteProductSaga({ id, activePage, currentLimit, token }) {
  try {
    yield axios.delete(`https://node-shop-cart.herokuapp.com/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(actions.getProducts(activePage, currentLimit, token));
  } catch (error) {
    toast.error("Something went wrong while deleting.Please try again!");
  }
}
