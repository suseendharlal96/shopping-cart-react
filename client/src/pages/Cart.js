import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { Card, Button, Image, Input } from "semantic-ui-react";

import { AuthContext } from "../context/authcontext";

const Cart = (props) => {
  const [cartTotal, setTotal] = useState(0);
  const [qtyChanged, setQtyChanged] = useState(false);
  const [myCart, setMyCart] = useState(null);
  const [actualmyCart, setactualMyCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token, userId, setCartTotal, email } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      props.history.push("/auth");
    } else {
      getCart();
    }
  }, []);

  const getCart = () => {
    setLoading(true);
    axios
      .get(`/user/getCart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        if (res.data.cart) {
          const a = [...res.data.cart];
          setMyCart(res.data.cart);
          calcTotalPrice(res.data.cart);
          // const a = [...myCart];
          setActualCart(a);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const setActualCart = (a) => {
    setactualMyCart(a);
  };

  const calcTotalPrice = (cart) => {
    if (cart && cart.length) {
      let total = 0;
      cart.map((c) => {
        total += c.price * c.qty;
      });
      setTotal(total);
    }
  };

  const increase = (i) => {
    console.log(myCart);
    console.log(actualmyCart);
    const a = [...myCart];
    if (a && a.length) {
      a[i].qty += 1;
      checkChanges(a, i);
      calcTotalPrice(a);
    }
  };

  const checkChanges = (cart, i) => {
    console.log(cart[i].qty);
    console.log(actualmyCart[i].qty);
    if (cart[i].qty !== actualmyCart[i].qty) {
      setQtyChanged(true);
    } else {
      setQtyChanged(false);
    }
    setMyCart(cart);
  };

  const decrease = (i) => {
    const a = [...myCart];
    if (a && a.length) {
      a[i].qty -= 1;
      checkChanges(a, i);
      calcTotalPrice(a);
    }
  };

  const removeItem = (i, total, id) => {
    const a = [...myCart];
    a.splice(i, 1);
    setMyCart(a);
    const totalAmt = cartTotal - total;
    setTotal(totalAmt);
    axios
      .post(
        "/user/removeCartItem",
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const makepayment = (paymentToken, product, i) => {
    console.log(paymentToken);
    console.log(product);
    axios
      .post(
        "/user/pay",
        { product: product, token: paymentToken },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const a = myCart.splice(i, 1);
        setMyCart(a);
        window.open(res.data.result.receipt_url, "_blank");
        console.log(res);
        // props.history.push("/success");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Total Price:{cartTotal}</h2>
      {myCart ? (
        myCart.length ? (
          myCart.map((c, index) => (
            <Card fluid key={c._id}>
              <Card.Content>
                <Image floated="right" size="tiny" src={c.image} />
                <Card.Header>Name:{c.name}</Card.Header>
                <Card.Meta>
                  <strong>Price:{c.price}</strong>
                </Card.Meta>
                <Card.Meta>
                  <strong>Quantity:{c.qty}</strong>
                </Card.Meta>
                <Card.Meta>
                  <strong>Total price:{c.qty * c.price}</strong>
                </Card.Meta>
                <Card.Description>About:{c.description}</Card.Description>
                <Button disabled={c.qty === 1} onClick={() => decrease(index)}>
                  Decrease
                </Button>
                <Input readOnly type="text" value={c.qty} />
                <Button onClick={() => increase(index)}>Increase</Button>
                {qtyChanged && (
                  <Button inverted color="green" floated="right">
                    Save Changes
                  </Button>
                )}
              </Card.Content>
              <Card.Content extra>
                <StripeCheckout
                  token={(t) => makepayment(t, c, index)}
                  name={"Product Name: " + c.name}
                  image={c.image}
                  email={email}
                  panelLabel={"Proceed to pay"}
                  description="STRIPE-Safe and Secure Payments"
                  stripeKey="pk_test_51H54IgEH45zGy2FRW5V9EQMtqCHFnUbuxogqUbG8ENCn5GBUT6qxDeFTvfomsusc2J6aUSpzmB3UJLnLOMh2aq4t00c2Cwlhz3"
                  amount={c.qty * c.price * 100}
                  currency="INR"
                >
                  <Button inverted color="green">
                    Checkout
                  </Button>
                </StripeCheckout>
                <Button
                  inverted
                  color="red"
                  onClick={() => removeItem(index, c.qty * c.price, c._id)}
                  floated="right"
                >
                  Remove from cart
                </Button>
              </Card.Content>
            </Card>
          ))
        ) : (
          <h2>Cart is Empty</h2>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Cart;
