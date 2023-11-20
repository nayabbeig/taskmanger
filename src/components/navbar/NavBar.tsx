import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { drawerWidth } from "./config";
import TitleBar from "./TitleBar";
import MobileNavBarMenuDrawer from "./MobileNavBarMenuDrawer";
import DesktopNavBarMenuDrawer from "./DesktopNavBarMenuDrawer";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TitleBar handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <MobileNavBarMenuDrawer
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
        <DesktopNavBarMenuDrawer />
      </Box>
    </Box>
  );
}
