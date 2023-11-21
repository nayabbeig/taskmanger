import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavBar from "../components/navbar/NavBar";
import AddTaskForm from "../components/task/AddTaskForm";
import { useNavigate } from "react-router-dom";
import PATHS from "../routing/paths";

const drawerWidth = 240;

export default function AddTaskPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <AddTaskForm />
      </Box>
    </Box>
  );
}
