import * as React from "react";
import List from "@mui/material/List";

import { Task, TaskType } from "../../features/task/taskSlice";

import EditTaskForm from "./EditTaskForm";
import { useAppSnackbar } from "../common/AppSnackbar";
import { TaskTableHeader } from "./TaskTableHeader";
import TaskListItem from "./TaskListItem";

export interface TaskTableProps {
  tasks: Task[];
  type: TaskType;
}

export enum SortingOptions {
  BY_DUE_DATE = "byDueDate",
  BY_COMPLETION_DATE = "byCompletionDate",
  BY_TITLE = "byTitle",
}

export enum SortingDirection {
  ASCENDING = "ascending",
  DESCENDING = "descending",
}

export default function TaskTable({ tasks, type }: TaskTableProps) {
  const [sortingDirection, setSortingDirection] =
    React.useState<SortingDirection>(SortingDirection.ASCENDING);
  const [sortBy, setSortBy] = React.useState<SortingOptions>(
    SortingOptions.BY_TITLE
  );
  const [dateSelectorValue, setDateSelectorValue] = React.useState<Date | null>(
    null
  );
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const [taskToEdit, setTaskToEdit] = React.useState<Task | null>(null);

  const sortedAndFilteredTasks = React.useMemo(() => {
    let result = tasks;
    if (dateSelectorValue) {
      result = tasks.filter((task) => {
        return (
          dateSelectorValue.toLocaleDateString() ===
          new Date(
            type === TaskType.COMPLETED && task.completionDate
              ? task.completionDate
              : task.dueDate
          ).toLocaleDateString()
        );
      });
    }

    if (searchQuery) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
    }

    if (sortBy === SortingOptions.BY_TITLE) {
      result = result.sort((taskA, taskB) =>
        taskA.title.localeCompare(taskB.title)
      );
    } else {
      result = result.sort((taskA, taskB) =>
        type === TaskType.COMPLETED &&
        taskA.completionDate &&
        taskB.completionDate
          ? Date.parse(taskA.completionDate) - Date.parse(taskB.completionDate)
          : Date.parse(taskA.dueDate) - Date.parse(taskB.dueDate)
      );
    }

    return sortingDirection === SortingDirection.DESCENDING
      ? result.reverse()
      : result;
  }, [tasks, sortingDirection, sortBy, dateSelectorValue, searchQuery]);

  const {
    AppSnackbar: AppSnackbarUpdateSuccess,
    showAppSnackbar: showAppSnackbarUpdateSuccess,
  } = useAppSnackbar({
    severity: "success",
    message: "Task has been updated",
  });

  const onUpdateComplete = () => {
    setTaskToEdit(null);
    showAppSnackbarUpdateSuccess();
  };

  return taskToEdit ? (
    <EditTaskForm
      task={taskToEdit}
      onComplete={onUpdateComplete}
      cancelUpdate={() => setTaskToEdit(null)}
    />
  ) : (
    <>
      <TaskTableHeader
        {...{
          taskType: type,
          sortingDirection,
          setSortingDirection,
          setSortBy,
          setDateSelectorValue,
          setSearchQuery,
        }}
      />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {sortedAndFilteredTasks.map((task, index) => (
          <TaskListItem
            task={task}
            type={type}
            handleEdit={() => setTaskToEdit(task)}
          />
        ))}

        <AppSnackbarUpdateSuccess />
      </List>
    </>
  );
}
