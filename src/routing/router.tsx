import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import CompletedTasksPage from "../pages/CompletedTasks.page";
import PendingTasksPage from "../pages/PendingTasks.page";
import PATHS from "./paths";
import LoginPage from "../pages/Login.page";
import SignUp from "../pages/SignUp.page";
import AddTaskPage from "../pages/AddTask.page";
import { getCurrentUser } from "../features/task/taskApi";

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const loggedIn = getCurrentUser();

  if (loggedIn) {
    return children;
  } else {
    return <Navigate to={PATHS.LOGIN} />;
  }
}

function PublicRoute({ children }: { children: React.ReactElement }) {
  const loggedIn = getCurrentUser();

  if (!loggedIn) {
    return children;
  } else {
    return <Navigate to={PATHS.HOME} />;
  }
}

const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: (
      <PrivateRoute>
        <PendingTasksPage />
      </PrivateRoute>
    ),
  },
  {
    path: PATHS.PENDING_TASKS,
    element: (
      <PrivateRoute>
        <PendingTasksPage />
      </PrivateRoute>
    ),
  },
  {
    path: PATHS.ADD_TASK,
    element: (
      <PrivateRoute>
        <AddTaskPage />
      </PrivateRoute>
    ),
  },
  {
    path: PATHS.COMPLETED_TASKS,
    element: (
      <PrivateRoute>
        <CompletedTasksPage />
      </PrivateRoute>
    ),
  },
  {
    path: PATHS.LOGIN,
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: PATHS.LOGOUT,
    element: <SignUp />,
  },
  {
    path: PATHS.SIGNUP,
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
