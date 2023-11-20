import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import DashboardPage from "./pages/Dashboard.page";
import CompletedTasksPage from "./pages/CompletedTasks.page";
import PendingTasksPage from "./pages/PendingTasks.page";
import AppRouter from "./routing/router";

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
