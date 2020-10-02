import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Button, Image, Input, Transition } from "semantic-ui-react";

import * as action from "../store/actions/index";
import LoadingSkeleton from "../components/LoadingSkeleton";
// import { AuthContext } from "../context/authcontext";

const Cart = (props) => {
  toast.configure();
  const [cartTotal, setTotal] = useState(0);
  // const [myCart, setMyCart] = useState(null);

  // const { token, userId, email } = useContext(AuthContext);

  useEffect(() => {
    if (!props.token) {
      props.history.push("/auth");
    } else {
      props.getCart(props.token, props.userId);
      if (props.errors) {
        toast.error(props.errors);
      }
    }
  }, []);

  useEffect(() => {
    if (props.cart) {
      calcTotalPrice(props.cart);
    }
  }, [props.cart]);

  const calcTotalPrice = (cart) => {
    let total = 0;
    if (cart && cart.length) {
      cart.map((c) => {
        total += c.price * c.quantity;
      });
      setTotal(total);
    } else {
      setTotal(total);
    }
  };

  const increase = (i) => {
    const a = [...props.cart];
    if (a && a.length) {
      a[i].quantity += 1;
      calcTotalPrice(a);
    }
  };

  const decrease = (i) => {
    const a = [...props.cart];
    if (a && a.length) {
      a[i].quantity -= 1;
      calcTotalPrice(a);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Total Price:{cartTotal}</h2>
      {props.cart ? (
        props.cart.length > 0 ? (
          <React.Fragment>
            <Transition.Group animation="drop" duration={800}>
              {props.cart.map((c, index) => (
                <Card fluid key={c._id}>
                  <Card.Content>
                    <Image floated="right" size="tiny" src={c.image} />
                    <Card.Header>Name:{c.name}</Card.Header>
                    <Card.Meta>
                      <strong>Price:{c.price}</strong>
                    </Card.Meta>
                    <Card.Meta>
                      <strong>Quantity:{c.quantity}</strong>
                    </Card.Meta>
                    <Card.Meta>
                      <strong>Total price:{c.quantity * c.price}</strong>
                    </Card.Meta>
                    <Card.Description>About:{c.description}</Card.Description>
                    <Button
                      disabled={c.quantity === 1}
                      onClick={() => decrease(index)}
                    >
                      Decrease
                    </Button>
                    <Input readOnly type="text" value={c.quantity} />
                    <Button onClick={() => increase(index)}>Increase</Button>
                  </Card.Content>
                  <Card.Content extra>
                    <StripeCheckout
                      token={(t) => props.makepayment(t, c, props.token)}
                      name={"Product Name: " + c.name}
                      image={c.image}
                      email={props.email}
                      panelLabel={"Proceed to pay"}
                      description="STRIPE-Safe and Secure Payments"
                      stripeKey="pk_test_51H54IgEH45zGy2FRW5V9EQMtqCHFnUbuxogqUbG8ENCn5GBUT6qxDeFTvfomsusc2J6aUSpzmB3UJLnLOMh2aq4t00c2Cwlhz3"
                      amount={c.quantity * c.price * 100}
                      currency="INR"
                    >
                      <Button inverted color="green">
                        Pay
                      </Button>
                    </StripeCheckout>
                    <Button
                      inverted
                      color="red"
                      onClick={() => props.removeItem(c._id, props.token)}
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

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    userId: state.authReducer.userId,
    email: state.authReducer.email,
    cart: state.cartReducer.cart,
    errors: state.cartReducer.errors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (token, userId) => dispatch(action.getCart(token, userId)),
    removeItem: (id, token) => dispatch(action.removeFromCart(id, token)),
    makepayment: (paymentToken, product, token) =>
      dispatch(action.makePayment(paymentToken, product, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
