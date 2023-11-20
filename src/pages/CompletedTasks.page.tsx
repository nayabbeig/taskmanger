import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ResponsiveDrawer from "../components/navbar/NavBar";

const drawerWidth = 240;

export default function CompletedTasksPage() {
  return (
    <Box sx={{ display: "flex" }}>
      <ResponsiveDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          <h1>Completed Tasks</h1>
        </Typography>
      </Box>
    </Box>
  );
}
