import React, { useState, useEffect, useContext } from "react";

import { Form, Button } from "semantic-ui-react";

import { AuthContext } from "../context/authcontext";

const Checkout = (props) => {
  const { cartTotal, setCartTotal } = useContext(AuthContext);
  console.log(props);
  const [payment, setPayment] = useState({
    name: "",
    address: "",
    holdername: "",
    cardnumber: "",
    expirymonth: "",
    expiryyear: "",
    cvc: "",
  });

  useEffect(() => {
    if (!cartTotal) {
      props.history.push("/cart");
    }
  }, []);

  const cancel = () => {
    setCartTotal(null);
    props.history.push("/cart");
  };

  const onChangeInput = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  return (
    <Form>
      <h2>Your Total:{cartTotal}</h2>
      <Form.Field>
        <Form.Input
          name="name"
          //   error={errors && errors.title ? errors.title : null}
          value={payment.name || ""}
          placeholder="Name.."
          onChange={onChangeInput}
        />
        <Form.Input
          name="address"
          //   error={errors && errors.date ? errors.date : null}
          value={payment.address || ""}
          placeholder="Address.."
          onChange={onChangeInput}
        />
        <Form.Input
          name="holdername"
          //   error={errors && errors.price ? errors.price : null}
          type="text"
          value={payment.holdername || ""}
          placeholder="Card Holder Name.."
          onChange={onChangeInput}
        />
        <Form.Input
          name="cardnumber"
          //   error={errors && errors.description ? errors.description : null}
          value={payment.cardnumber || ""}
          placeholder="Card Number.."
          onChange={onChangeInput}
        />
        <Form.Input
          name="expirymonth"
          //   error={errors && errors.description ? errors.description : null}
          value={payment.expirymonth || ""}
          placeholder="Expiry Month.."
          onChange={onChangeInput}
        />
        <Form.Input
          name="expiryyear"
          //   error={errors && errors.description ? errors.description : null}
          value={payment.expiryyear || ""}
          placeholder="Expiry Year.."
          onChange={onChangeInput}
        />
        <Form.Input
          name="cvc"
          //   error={errors && errors.description ? errors.description : null}
          value={payment.cvc || ""}
          placeholder="CVC.."
          onChange={onChangeInput}
        />
      </Form.Field>
      <Button inverted color="green">
        Pay Now
      </Button>
      <Button inverted color="red" onClick={cancel}>
        Go Back
      </Button>
    </Form>
  );
};

export default Checkout;
