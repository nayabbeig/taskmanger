import { Task } from "./taskSlice";

export interface User {
  name: string;
  username: string;
  password: string;
}

export interface AppData {
  currentUser: User;
  tasks: {
    [x: string]: Task[];
  };
}

export const APP_KEY = "TASK_MANAGER";

export const getAppData = () => {
  const appDataJson = localStorage.getItem(APP_KEY);
  if (!appDataJson) return null;
  return JSON.parse(appDataJson) as AppData;
};

export const saveTasks = (tasks: Task[]) => {
  const appData = getAppData();
  if (!appData) return;
  appData.tasks[appData.currentUser.username] = tasks;
  localStorage.setItem(APP_KEY, JSON.stringify(appData));
};

export const getTasks = () => {
  const appData = getAppData();
  if (!appData) return;
  return appData.tasks[appData.currentUser.username];
};
