import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as action from "../store/actions/index";
import { Menu } from "semantic-ui-react";

const Navbar = (props) => {
  return props.token ? (
    <Menu inverted>
      <Menu.Item name="Home" as={NavLink} exact to="/" />
      <Menu.Item name="cart" as={NavLink} to="/cart" />
      <Menu.Item name="Orders" as={NavLink} to="/orders" />
      <Menu.Menu position="right">
        <Menu.Item name={"Logged as " + props.email.split("@")[0]} />
        <Menu.Item
          name="logout"
          onClick={() => props.logout()}
          as={NavLink}
          to="/auth"
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu inverted>
      <Menu.Item name="Home" as={NavLink} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="Authenticate" as={NavLink} to="/auth" />
      </Menu.Menu>
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    email: state.authReducer.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(action.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
