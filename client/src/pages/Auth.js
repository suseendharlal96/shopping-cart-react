import React, { useState, useContext } from "react";

import { Form, Button } from "semantic-ui-react";
import axios from "axios";

import { AuthContext } from "../context/authcontext";

const Auth = (props) => {
  const { setToken, setEmail, setUserId } = useContext(AuthContext);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const changeMode = () => {
    setIsSignup(!isSignup);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // setemaile('')
    setErrors({ ...errors, email: null, password: null, general: null });
    console.log(errors.email);
    setLoading(true);
    let url = "signin";
    if (isSignup) {
      url = "signup";
    }
    axios
      .post(`https://node-shop-cart.herokuapp.com/user/${url}`, formValue)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data && res.data.result) {
          console.log(res.data);
          // setCart(res.data.result.cart);
          setEmail(res.data.result.email);
          setUserId(res.data.result._id);
          setToken(res.data.token);
          props.history.push("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        console.log(err.response);
        setErrors({ ...errors, email: null, password: null, general: null });
        if (err.response) {
          if (err.response.data.error) {
            setErrors({ ...errors, general: err.response.data.error });
          }
          if (err.response.data.email) {
            setErrors({ ...errors, email: err.response.data.email });
          }
          if (err.response.data.password) {
            setErrors({ ...errors, password: err.response.data.password });
          }
        }
      });
  };

  return (
    <div style={{ width: "30%", margin: "auto" }}>
      <h2 style={{ margin: "0 40%" }}>{isSignup ? "Signup" : "Login"}</h2>
      <Form onSubmit={onSubmit} noValidate>
        <Form.Input
          icon="user"
          loading={loading}
          label="Email"
          autoFocus
          placeholder="Email.."
          name="email"
          value={formValue.email}
          onChange={onChangeInput}
          error={errors.email && errors.email.length > 0 ? errors.email : null}
        />
        <Form.Input
          label="Password"
          icon="user"
          placeholder="Password.."
          name="password"
          loading={loading}
          value={formValue.password}
          onChange={onChangeInput}
          error={
            errors.password && errors.password.length > 0
              ? errors.password
              : null
          }
          type="password"
        />
        <Button.Group>
          <Button
            disabled={loading}
            type="button"
            color="red"
            onClick={changeMode}
          >
            {`Switch to ${isSignup ? "Login" : "Signup"}`}
          </Button>
          <Button.Or />
          <Button disabled={loading} type="submit" inverted color="green">
            {isSignup
              ? loading
                ? "Signing up.."
                : "Signup"
              : loading
              ? "Logging in.."
              : "Login"}
          </Button>
        </Button.Group>
      </Form>
      {errors.general && errors.general.length > 1 && (
        <div className="ui error message">{errors.general}</div>
      )}
    </div>
  );
};

export default Auth;
