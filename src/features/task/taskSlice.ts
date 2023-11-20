import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { getTasks } from "./taskApi";

export enum TaskType {
  PENDING = "pending",
  COMPLETED = "completed",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  type: TaskType;
}

// As everything is synchronous, I have not added any loader realted status
export interface TaskState {
  list: Task[];
}

const initialState: TaskState = {
  list: [],
};

const getInitialState = () => {
  const locallyStoredTasks = getTasks() || [];
  return {
    list: locallyStoredTasks as Task[],
  };
};

export const taskSlice = createSlice({
  name: "task",
  initialState: getInitialState,
  reducers: {
    create: (state, action: PayloadAction<Task>) => {
      state.list = [...state.list, action.payload];
    },
    remove: (state, action: PayloadAction<Task>) => {
      const filteredTasks = state.list.filter(
        (task) => task.id !== action.payload.id
      );
      state.list = filteredTasks;
    },
    update: (state, action: PayloadAction<Task>) => {
      const filteredTasks = state.list.filter(
        (task) => task.id !== action.payload.id
      );
      state.list = [...filteredTasks, action.payload];
    },
  },
});

export const { create, remove, update } = taskSlice.actions;

export const selectAllTasks = (state: RootState) => state.task.list;
export const selectAllPendingTasks = (state: RootState) =>
  state.task.list.filter((task) => task.type === TaskType.PENDING);
export const selectAllCompletedTasks = (state: RootState) =>
  state.task.list.filter((task) => task.type === TaskType.COMPLETED);
export const findTask = (state: RootState, id: string) =>
  state.task.list.find((task) => task.id === id);

export default taskSlice.reducer;
