import axios from "axios";

import * as actionType from "../actions/actionTypes";

const getOrdersSuccess = (orders) => {
  return {
    type: actionType.GET_ORDERS_SUCCESS,
    orders,
  };
};
const getOrdersFail = (errors) => {
  return {
    type: actionType.GET_ORDERS_FAIL,
    errors,
  };
};
export const getOrders = (token) => {
  return (dispatch) => {
    axios
      .get("https://node-shop-cart.herokuapp.com/user/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          dispatch(getOrdersSuccess(res.data.orders.reverse()));
        }
        // setOrders(res.data.orders.reverse());
      })
      .catch((err) => {
        dispatch(
          getOrdersFail(
            "There was some trouble fetching your orders.Please try again!"
          )
        );
        console.log(err);
        // toast.error(
        //   "There was some trouble fetching your orders.Please try again!"
        // );
      });
  };
};
