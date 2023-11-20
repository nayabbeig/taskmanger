import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { drawerWidth } from "./config";
import NavBarMenu from "./NavBarMenu";

interface MobileNavBarMenuDrawerProps {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}

const MobileNavBarMenuDrawer = (props: MobileNavBarMenuDrawerProps) => (
  <Drawer
    variant="temporary"
    open={props.mobileOpen}
    onClose={props.handleDrawerToggle}
    ModalProps={{
      keepMounted: true,
    }}
    sx={{
      display: { xs: "block", sm: "none" },
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: drawerWidth,
      },
    }}
  >
    <NavBarMenu />
  </Drawer>
);

export default MobileNavBarMenuDrawer;
