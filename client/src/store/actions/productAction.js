import axios from "axios";
import { toast } from "react-toastify";

import * as actionTypes from "./actionTypes";

const getProductsSuccess = (data) => {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    data,
  };
};
const getProductsFail = (error) => {
  return {
    type: actionTypes.GET_PRODUCTS_FAIL,
    error,
  };
};

export const getProducts = (activePage, currentLimit, token) => {
  return (dispatch) => {
    axios
      .get(
        `https://node-shop-cart.herokuapp.com/products?page=${activePage}&limit=${currentLimit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data && res.data.products) {
          dispatch(getProductsSuccess(res.data));
        }
      })
      .catch((err) => {
        dispatch(
          getProductsFail("There was some trouble fetching.Please try again!")
        );
      });
  };
};

const updateProductSuccess = (product) => {
  return {
    type: actionTypes.UPDATE_PRODUCTS_SUCCESS,
    product,
  };
};
const updateProductFail = (error) => {
  return {
    type: actionTypes.UPDATE_PRODUCTS_FAIL,
    error,
  };
};

export const updateProduct = (
  product,
  prodId,
  token,
  activePage,
  currentLimit
) => {
  toast.configure();
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
  return (dispatch) => {
    ax.then((res) => {
      toast.success("Product updated successfully");
      res.data && res.data.product
        ? dispatch(getProducts(activePage, currentLimit, token)) // update
        : dispatch(updateProductSuccess(res.data.createdProduct)); //create
    }).catch((err) => {
      dispatch(updateProductFail("There was some trouble.Please try again!"));
    });
  };
};

export const deleteProduct = (id, token, activePage, currentLimit) => {
  return (dispatch) => {
    axios
      .delete(`https://node-shop-cart.herokuapp.com/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(getProducts(activePage, currentLimit, token));
        // props.getProducts(activePage, currentLimit, props.token);
      })
      .catch((err) => {
        toast.error("Something went wrong while deleting.Please try again!");
      });
  };
};
