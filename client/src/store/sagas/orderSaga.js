import axios from "axios";
import { put } from "redux-saga/effects";

import * as actions from "../actions/index";

export function* getOrdersSaga({ token }) {
  try {
    const res = yield axios.get(
      "https://node-shop-cart.herokuapp.com/user/orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data) {
      yield put(actions.getOrdersSuccess(res.data.orders.reverse()));
    }
  } catch (err) {
    yield put(
      actions.getOrdersFail(
        "There was some trouble fetching your orders.Please try again!"
      )
    );
    console.log(err);
  }
}
