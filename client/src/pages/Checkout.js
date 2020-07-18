import React, { useState, useEffect, useContext } from "react";

import { Form, Button } from "semantic-ui-react";

import { AuthContext } from "../context/authcontext";

const Checkout = (props) => {
  const { cartTotal, setCartTotal } = useContext(AuthContext);
  console.log(props);

  useEffect(() => {
    if (!cartTotal) {
      props.history.push("/cart");
    }
  }, []);

  return <h2>Your payment was successfull</h2>;
};

export default Checkout;
