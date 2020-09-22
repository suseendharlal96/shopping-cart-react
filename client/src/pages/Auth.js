import React, { useState } from "react";
import { connect } from "react-redux";

import { Form, Button } from "semantic-ui-react";

import * as action from "../store/actions/index";
// import { AuthContext } from "../context/authcontext";

const Auth = (props) => {
  // const { setToken, setEmail, setUserId } = useContext(AuthContext);
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
  // const [loading, setLoading] = useState(false);

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
    // setLoading(true);
    let url = "signin";
    if (isSignup) {
      url = "signup";
    }
    props.authenticate(url, formValue, props.history);
  };

  return (
    <div style={{ width: "30%", margin: "auto" }}>
      <h2 style={{ margin: "0 40%" }}>{isSignup ? "Signup" : "Login"}</h2>
      <Form onSubmit={onSubmit} noValidate>
        <Form.Input
          icon="user"
          loading={props.loading}
          label="Email"
          autoFocus
          placeholder="Email.."
          name="email"
          value={formValue.email}
          onChange={onChangeInput}
          error={
            props.errors.email && props.errors.email.length > 0
              ? props.errors.email
              : null
          }
        />
        <Form.Input
          label="Password"
          icon="user"
          placeholder="Password.."
          name="password"
          loading={props.loading}
          value={formValue.password}
          onChange={onChangeInput}
          error={
            props.errors.password && props.errors.password.length > 0
              ? props.errors.password
              : null
          }
          type="password"
        />
        <Button.Group>
          <Button
            disabled={props.loading}
            type="button"
            color="red"
            onClick={changeMode}
          >
            {`Switch to ${isSignup ? "Login" : "Signup"}`}
          </Button>
          <Button.Or />
          <Button disabled={props.loading} type="submit" inverted color="green">
            {isSignup
              ? props.loading
                ? "Signing up.."
                : "Signup"
              : props.loading
              ? "Logging in.."
              : "Login"}
          </Button>
        </Button.Group>
      </Form>
      {props.errors.general && props.errors.general.length > 1 && (
        <div className="ui error message">{props.errors.general}</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    errors: state.authReducer.errors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (url, formValue, route) =>
      dispatch(action.authInit(url, formValue, route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
