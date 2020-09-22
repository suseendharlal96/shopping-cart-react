import axios from "axios";

import * as actionType from "./actionTypes";

const authStart = () => {
  return {
    type: actionType.AUTH_START,
  };
};

const authSuccess = (authData) => {
  return {
    type: actionType.AUTH_SUCCESS,
    email: authData.result.email,
    token: authData.token,
    userId: authData.result._id,
  };
};

const authFail = (errors) => {
  return {
    type: actionType.AUTH_FAIL,
    errors,
  };
};

export const authInit = (url, formValue, route) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`https://node-shop-cart.herokuapp.com/user/${url}`, formValue)
      .then((res) => {
        dispatch(authSuccess(res.data));
        if (res.data && res.data.result) {
          route.push("/");
        }
      })
      .catch((err) => {
        if (err.response) {
          dispatch(authFail(err.response.data));
          //   if (err.response.data.error) {
          //     setErrors({ ...errors, general: err.response.data.error });
          //   }
          //   if (err.response.data.email) {
          //     setErrors({ ...errors, email: err.response.data.email });
          //   }
          //   if (err.response.data.password) {
          //     setErrors({ ...errors, password: err.response.data.password });
          //   }
        }
      });
  };
};

export const logout = () => {
  return {
    type: actionType.AUTH_LOGOUT,
  };
};
