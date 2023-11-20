import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";

export interface NavItemType {
  id: string;
  label: string;
  Icon: JSX.Element;
  path: string;
}

const NavItem = ({ id, Icon, label, path }: NavItemType) => {
  const { pathname } = useLocation();
  return (
    <Link className="undecoratedLink" to={path}>
      <ListItem selected={path === pathname} id={id} disablePadding>
        <ListItemButton>
          <ListItemIcon>{Icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default NavItem;
