import React, { useState, useEffect, useContext } from "react";

import { Card, Image } from "semantic-ui-react";
import axios from "axios";
import dayjs from "dayjs";

import { AuthContext } from "../context/authcontext";

const Orders = (props) => {
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
      .get("/user/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.orders.reverse());
      });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Your orders</h2>
      {orders ? (
        orders.length ? (
          orders.map((c, index) => (
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
                  <strong>Total price:{c.product.qty * c.product.price}</strong>
                </Card.Meta>
                <Card.Meta>
                  <strong>Payment Type:{c.paymentDetails.type}</strong>
                </Card.Meta>
                <Card.Meta>
                  <strong>Card Type:{c.paymentDetails.card.brand}</strong>
                </Card.Meta>
                <Card.Meta>
                  <strong>
                    Paid on:{dayjs(c.date).format("ddd, MMM D, YYYY h:mm A")}
                  </strong>
                </Card.Meta>
                <Card.Description>
                  About:{c.product.description}
                </Card.Description>
                <a
                  style={{ float: "right" }}
                  href={c.receiptUrl}
                  target="_blank"
                >
                  Click to view your Payment receipt
                </a>
              </Card.Content>
            </Card>
          ))
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
