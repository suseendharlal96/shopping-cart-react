import React from "react";
import { NavLink } from "react-router-dom";

import { Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu inverted size="large" color="blue">
      <Menu.Item name="Home" as={NavLink} to="/" />
      <Menu.Item name="Orders" as={NavLink} to="/orders"/>
      <Menu.Menu position="right">
        <Menu.Item name="Authenticate" as={NavLink} to="/auth" />
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
