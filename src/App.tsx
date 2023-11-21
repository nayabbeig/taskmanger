import React, { useEffect } from "react";
import AppRouter from "./routing/router";
import { setInitialAppData } from "./features/task/taskApi";

import "./App.css";

function App() {
  useEffect(() => {
    setInitialAppData({
      currentUser: null,
      users: [],
      tasks: {},
    });
  }, []);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
