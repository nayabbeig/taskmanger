import { Task } from "./taskSlice";

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface AppData {
  currentUser: User | null;
  users: User[];
  tasks: {
    [x: string]: Task[];
  };
}

export const APP_KEY = "TASK_MANAGER";

export const setInitialAppData = (initialAppData: AppData) => {
  if (!localStorage.getItem(APP_KEY))
    localStorage.setItem(APP_KEY, JSON.stringify(initialAppData));
};

export const getAppData = () => {
  const appDataJson = localStorage.getItem(APP_KEY);
  if (!appDataJson) return null;
  return JSON.parse(appDataJson) as AppData;
};

export const setAppData = (appData: AppData) => {
  localStorage.setItem(APP_KEY, JSON.stringify(appData));
};

export const getCurrentUser = () => {
  const appData = getAppData();
  return appData?.currentUser;
};

export const saveTasks = (tasks: Task[]) => {
  const appData = getAppData();
  if (!appData?.currentUser) return;
  const { currentUser } = appData;
  appData.tasks[currentUser.username] = tasks;
  setAppData(appData);
};

export const getTasks = () => {
  const appData = getAppData();
  if (!appData?.currentUser) return;
  const { currentUser } = appData;
  return appData.tasks[appData.currentUser.username];
};
