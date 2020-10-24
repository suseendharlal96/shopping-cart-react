import axios from "axios";
import { put } from "redux-saga/effects";

import * as actions from "../actions/index";

export function* authInitSaga({ url, formValue, route }) {
  yield put(actions.authStart());
  try {
    const res = yield axios.post(
      `https://node-shop-cart.herokuapp.com/user/${url}`,
      formValue
    );
    yield put(actions.authSuccess(res.data));
    if (res.data && res.data.result) {
      route.push("/");
    }
  } catch (err) {
    if (err.response) {
      yield put(actions.authFail(err.response.data));
    }
  }
}
