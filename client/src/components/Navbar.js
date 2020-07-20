import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { Menu } from "semantic-ui-react";

import { AuthContext } from "../context/authcontext";

const Navbar = () => {
  const { email, setToken, token } = useContext(AuthContext);
  return token ? (
    <Menu inverted>
      <Menu.Item name="Home" as={NavLink} exact to="/" />
      <Menu.Item name="cart" as={NavLink} to="/cart" />
      <Menu.Item name="Orders" as={NavLink} to="/orders" />
      <Menu.Menu position="right">
        <Menu.Item name={"Logged as " + email.split("@")[0]} />
        <Menu.Item
          name="logout"
          onClick={() => setToken(null)}
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

export default Navbar;
