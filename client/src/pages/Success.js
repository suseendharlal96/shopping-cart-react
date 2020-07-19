import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import { Button } from "semantic-ui-react";

import { AuthContext } from "../context/authcontext";

const Success = (props) => {
  const { token } = useContext(AuthContext);
  console.log(props);
  useEffect(() => {
    if (!token) {
      props.history.push("/auth");
    }
  }, []);

  return (
    <div>
      <h2>Your payment was successfully received :)</h2>
      <h4>Thank you for shopping with us!</h4>
      <Button as={NavLink} to="/">
        Continue
      </Button>
      <Button as={NavLink} to="/orders">
        My Orders
      </Button>
    </div>
  );
};

export default Success;
