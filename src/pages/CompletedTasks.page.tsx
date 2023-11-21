import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavBar from "../components/navbar/NavBar";
import AddTaskForm from "../components/task/AddTaskForm";
import TaskTable from "../components/task/TaskTable";
import { useAppSelector } from "../app/hooks";
import { TaskType, selectAllCompletedTasks } from "../features/task/taskSlice";

const drawerWidth = 240;

export default function CompletedTasksPage() {
  const completedTasks = useAppSelector(selectAllCompletedTasks);
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
        <TaskTable type={TaskType.COMPLETED} tasks={completedTasks} />
      </Box>
    </Box>
  );
}
