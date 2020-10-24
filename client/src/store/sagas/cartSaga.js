import axios from "axios";
import { toast } from "react-toastify";
import { put } from "redux-saga/effects";

import * as actions from "../actions/index";
toast.configure();

export function* getCartSaga({ token, userId }) {
  try {
    const res = yield axios.get(
      `https://node-shop-cart.herokuapp.com/user/getCart/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.cart) {
      yield put(actions.getCartSuccess(res.data.cart));
    }
  } catch (err) {
    console.log(err);
    yield put(
      actions.getCartFail(
        "There was some trouble fetching your cart.Please try again!"
      )
    );
  }
}

export function* addToCartSaga({ product, token }) {
  try {
    const res = yield axios.post(
      "https://node-shop-cart.herokuapp.com/user/cart",
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res) {
      toast.success("Product added to Cart.");
    }
  } catch (err) {
    toast.error("There was some trouble adding to cart.Please try again!");
  }
}

export function* removeFromCartSaga({ id, token }) {
  try {
    const res = yield axios.post(
      "https://node-shop-cart.herokuapp.com/user/removeCartItem",
      { productId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res) {
      yield put(actions.removeFromCartSuccess(id));
      toast.success("Product removed from cart.");
    }
  } catch (err) {
    console.log(err);
    toast.error("There was some trouble.Please try again!");
  }
}

export function* paymentSaga({ paymentToken, product, token }) {
  try {
    const res = yield axios.post(
      "https://node-shop-cart.herokuapp.com/user/pay",
      { product: product, token: paymentToken },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res) {
      yield put(actions.paymentSuccess(product._id));
      toast.success("Your payment was successfully received.");
      window.open(res.data.result.receipt_url, "_blank");
    }
  } catch (err) {
    toast.error("There was some trouble with payment.Please try again!");
    console.log(err);
  }
}
