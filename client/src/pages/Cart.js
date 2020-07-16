import React, { useState, useEffect, useContext } from "react";

import { Card, Button, Image } from "semantic-ui-react";

import { AuthContext } from "../context/authcontext";

const Cart = (props) => {
  const [cartTotal, setTotal] = useState([]);
  const { cart, token } = useContext(AuthContext);
  useEffect(() => {
    if (!token) {
      props.history.push("/auth");
    }
    if (cart && cart.length) {
      let total = 0;
      cart.map((c) => {
        total += c.price * c.qty;
      });
      setTotal(total);
    }
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Total Price:{cartTotal}</h2>
      {cart && cart.length ? (
        cart.map((c) => (
          <Card fluid key={c._id}>
            <Card.Content>
              <Image floated="right" size="tiny" src={c.image} />
              <Card.Header>Name:{c.name}</Card.Header>
              <Card.Meta>Price:{c.price}</Card.Meta>
              <Card.Meta>Quantity:{c.qty}</Card.Meta>
              <Card.Meta>Total price:{c.qty * c.price}</Card.Meta>
              <Card.Description>About:{c.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button inverted color="green">
                Checkout
              </Button>
            </Card.Content>
          </Card>
        ))
      ) : (
        <h2>Cart is Empty</h2>
      )}
    </div>
  );
};

export default Cart;
