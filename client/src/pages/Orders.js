import React, { useState, useEffect, useContext } from "react";

import { Card, Image, Transition } from "semantic-ui-react";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../context/authcontext";

const Orders = (props) => {
  toast.configure();
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    if (!token) {
      props.history.push("/");
    } else {
      getOrders();
    }
  }, []);

  const getOrders = () => {
    axios
      .get("https://node-shop-cart.herokuapp.com/user/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data.orders.reverse());
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "There was some trouble fetching your orders.Please try again!"
        );
      });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Your orders</h2>
      {orders ? (
        orders.length>0 ? (
          <React.Fragment>
            <Transition.Group animation="horizondal flip" duration={800}>
              {orders.map((c, index) => (
                <Card fluid key={c.date}>
                  <Card.Content>
                    <Image floated="right" size="tiny" src={c.product.image} />
                    <Card.Header>Name:{c.product.name}</Card.Header>
                    <Card.Meta>
                      <strong>Price:{c.product.price}</strong>
                    </Card.Meta>
                    <Card.Meta>
                      <strong>Quantity:{c.product.qty}</strong>
                    </Card.Meta>
                    <Card.Meta>
                      <strong>
                        Total price:{c.product.qty * c.product.price}
                      </strong>
                    </Card.Meta>
                    <Card.Meta>
                      <strong>Payment Type:{c.paymentDetails.type}</strong>
                    </Card.Meta>
                    <Card.Meta>
                      <strong>Card Type:{c.paymentDetails.card.brand}</strong>
                    </Card.Meta>
                    <Card.Meta>
                      <strong>
                        Paid on:
                        {dayjs(c.date).format("ddd, MMM D, YYYY h:mm A")}
                      </strong>
                    </Card.Meta>
                    <a
                      style={{ float: "right" }}
                      href={c.receiptUrl}
                      target="_blank"
                    >
                      Click to view your Payment receipt
                    </a>
                  </Card.Content>
                </Card>
              ))}
            </Transition.Group>
          </React.Fragment>
        ) : (
          <h2>Orders is Empty</h2>
        )
      ) : (
        <p>Loading Orders...</p>
      )}
    </div>
  );
};

export default Orders;
