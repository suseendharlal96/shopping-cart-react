import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Button, Image, Input, Transition } from "semantic-ui-react";

import LoadingSkeleton from "../components/LoadingSkeleton";
import { AuthContext } from "../context/authcontext";

const Cart = (props) => {
  toast.configure();
  const [cartTotal, setTotal] = useState(0);
  const [myCart, setMyCart] = useState(null);

  const { token, userId, email } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      props.history.push("/auth");
    } else {
      getCart();
    }
  }, []);

  const getCart = () => {
    axios
      .get(`https://node-shop-cart.herokuapp.com/user/getCart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.cart) {
          const a = [...res.data.cart];
          setMyCart(res.data.cart);
          calcTotalPrice(res.data.cart);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "There was some trouble fetching your cart.Please try again!"
        );
      });
  };

  const calcTotalPrice = (cart) => {
    let total = 0;
    if (cart && cart.length) {
      cart.map((c) => {
        total += c.price * c.qty;
      });
      setTotal(total);
    } else {
      setTotal(total);
    }
  };

  const increase = (i) => {
    const a = [...myCart];
    if (a && a.length) {
      a[i].qty += 1;
      calcTotalPrice(a);
    }
  };

  const decrease = (i) => {
    const a = [...myCart];
    if (a && a.length) {
      a[i].qty -= 1;
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
        "https://node-shop-cart.herokuapp.com/user/removeCartItem",
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Product removed from cart.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("There was some trouble.Please try again!");
      });
  };

  const makepayment = (paymentToken, product, i) => {
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
        toast.success("Your payment was successfully received.");
        getCart();
        window.open(res.data.result.receipt_url, "_blank");
      })
      .catch((err) => {
        toast.error("There was some trouble with payment.Please try again!");
        console.log(err);
      });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Total Price:{cartTotal}</h2>
      {myCart ? (
        myCart.length > 0 ? (
          <React.Fragment>
            <Transition.Group animation="drop" duration={800}>
              {myCart.map((c, index) => (
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
                    <Button
                      disabled={c.qty === 1}
                      onClick={() => decrease(index)}
                    >
                      Decrease
                    </Button>
                    <Input readOnly type="text" value={c.qty} />
                    <Button onClick={() => increase(index)}>Increase</Button>
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
                        Pay
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
              ))}
            </Transition.Group>
          </React.Fragment>
        ) : (
          <h2>Cart is Empty</h2>
        )
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
};

export default Cart;
