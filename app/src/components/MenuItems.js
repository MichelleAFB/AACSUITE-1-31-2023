import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Menu } from "antd";

const { Item, SubMenu } = Menu;

export const MenuItems = () => {
  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/host">
        <Link to="/host">
          <Icon type="home" />
          Host
        </Link>
      </Item>
      <Item key="/login">
        <Link to="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Item>
    </Menu>
  );
};