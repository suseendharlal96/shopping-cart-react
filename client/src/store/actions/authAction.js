import * as actionType from "./actionTypes";

export const authStart = () => ({
  type: actionType.AUTH_START,
});

export const authSuccess = (authData) => ({
  type: actionType.AUTH_SUCCESS,
  email: authData.result.email,
  token: authData.token,
  userId: authData.result._id,
});

export const authFail = (errors) => ({
  type: actionType.AUTH_FAIL,
  errors,
});

export const authInit = (url, formValue, route) => ({
  type: actionType.AUTH_START_SAGA,
  url,
  formValue,
  route,
});

export const logout = () => ({
  type: actionType.AUTH_LOGOUT,
});
