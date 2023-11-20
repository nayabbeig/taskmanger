import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "../pages/Dashboard.page";
import CompletedTasksPage from "../pages/CompletedTasks.page";
import PendingTasksPage from "../pages/PendingTasks.page";
import PATHS from "./paths";
import LoginPage from "../pages/Login.page";
import SignUp from "../pages/SignUp.page";

const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <DashboardPage />,
  },
  {
    path: PATHS.PENDING_TASKS,
    element: <PendingTasksPage />,
  },
  {
    path: PATHS.COMPLETED_TASKS,
    element: <CompletedTasksPage />,
  },
  {
    path: PATHS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PATHS.LOGOUT,
    element: <SignUp />,
  },
  {
    path: PATHS.SIGNUP,
    element: <SignUp />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
