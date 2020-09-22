import axios from "axios";
import { toast } from "react-toastify";

import * as actionType from "./actionTypes";

const getCartSuccess = (cart) => {
  return {
    type: actionType.GET_CART_SUCCESS,
    cart,
  };
};
const getCartFail = (errors) => {
  return {
    type: actionType.GET_CART_FAIL,
    errors,
  };
};

export const getCart = (token, userId) => {
  return (dispatch) => {
    axios
      .get(`https://node-shop-cart.herokuapp.com/user/getCart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.cart) {
          dispatch(getCartSuccess(res.data.cart));
          //   calcTotalPrice(res.data.cart);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          getCartFail(
            "There was some trouble fetching your cart.Please try again!"
          )
        );
      });
  };
};

export const addToCart = (product, token) => {
  toast.configure();
  return (dispatch) => {
    axios
      .post("https://node-shop-cart.herokuapp.com/user/cart", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Product added to Cart.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("There was some trouble adding to cart.Please try again!");
      });
  };
};

const removeFromCartSuccess = (id) => {
  return {
    type: actionType.REMOVE_FROM_CART_SUCCESS,
    id,
  };
};

export const removeFromCart = (id, token) => {
  return (dispatch) => {
    axios
      .post(
        "https://node-shop-cart.herokuapp.com/user/removeCartItem",
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(removeFromCartSuccess(id));
        toast.success("Product removed from cart.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("There was some trouble.Please try again!");
      });
  };
};

const paymentSuccess = (id) => {
  return {
    type: actionType.PAYMENT_SUCCESS,
    id,
  };
};

export const makePayment = (paymentToken, product, token) => {
  return (dispatch) => {
    axios
      .post(
        "https://node-shop-cart.herokuapp.com/user/pay",
        { product: product, token: paymentToken },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(paymentSuccess(product._id));
        toast.success("Your payment was successfully received.");
        window.open(res.data.result.receipt_url, "_blank");
      })
      .catch((err) => {
        toast.error("There was some trouble with payment.Please try again!");
        console.log(err);
      });
  };
};
