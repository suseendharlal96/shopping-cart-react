import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Card, Image, Transition } from "semantic-ui-react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as action from "../store/actions/index";
import LoadingSkeleton from "../components/LoadingSkeleton";
// import { AuthContext } from "../context/authcontext";

const Orders = (props) => {
  toast.configure();
  // const { token } = useContext(AuthContext);
  // const [orders, setOrders] = useState(null);
  useEffect(() => {
    if (!props.token) {
      props.history.push("/");
    } else {
      props.getOrders(props.token);
      if (props.errors) {
        toast.error(props.errors);
      }
    }
  }, []);

  // const getOrders = () => {
  //   axios
  //     .get("https://node-shop-cart.herokuapp.com/user/orders", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setOrders(res.data.orders.reverse());
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(
  //        props.errors
  //       );
  //     });
  // };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Your orders</h2>
      {props.orders ? (
        props.orders.length > 0 ? (
          <React.Fragment>
            <Transition.Group animation="horizondal flip" duration={800}>
              {props.orders.map((c, index) => (
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
                    {c && c.paymentDetails && (
                      <>
                        <Card.Meta>
                          <strong>Payment Type:{c.paymentDetails.type}</strong>
                        </Card.Meta>
                        <Card.Meta>
                          <strong>
                            Card Type:{c.paymentDetails.card.brand}
                          </strong>
                        </Card.Meta>
                      </>
                    )}
                    <Card.Meta>
                      <strong>
                        Paid on:
                        {dayjs(c.date).format("ddd, MMM D, YYYY h:mm A")}
                      </strong>
                    </Card.Meta>
                    {c && c.receiptUrl && (
                      <a
                        style={{ float: "right" }}
                        href={c.receiptUrl}
                        target="_blank"
                      >
                        Click to view your Payment receipt
                      </a>
                    )}
                  </Card.Content>
                </Card>
              ))}
            </Transition.Group>
          </React.Fragment>
        ) : (
          <h2>Orders is Empty</h2>
        )
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    errors: state.orderReducer.errors,
    token: state.authReducer.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (token) => dispatch(action.getOrders(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
