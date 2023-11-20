import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { drawerWidth } from "./config";
import NavBarMenu from "./NavBarMenu";

const DesktopNavBarMenuDrawer = () => (
  <Drawer
    variant="permanent"
    sx={{
      display: { xs: "none", sm: "block" },
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: drawerWidth,
      },
    }}
    open
  >
    <NavBarMenu />
  </Drawer>
);

export default DesktopNavBarMenuDrawer;
