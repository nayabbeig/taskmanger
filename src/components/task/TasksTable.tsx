import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import EventIcon from "@mui/icons-material/Event";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Task,
  TaskType,
  removeTask,
  updateTask,
} from "../../features/task/taskSlice";
import { useAppDispatch } from "../../app/hooks";
import EditTaskForm from "./EditTaskForm";
import { useAppSnackbar } from "../common/AppSnackbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface TaskTableProps {
  tasks: Task[];
  type: TaskType;
}

enum SortingOptions {
  BY_DUE_DATE = "byDueDate",
  BY_COMPLETION_DATE = "byCompletionDate",
  BY_TITLE = "byTitle",
}

enum SortingDirection {
  ASCENDING = "ascending",
  DESCENDING = "descending",
}

interface TaskTableHeader {
  taskType: TaskType;
  sortingDirection: SortingDirection;
  setSortingDirection: (sortingDirectoin: SortingDirection) => void;
  setSortBy: (sortBy: SortingOptions) => void;
  setDateSelectorValue: (date: Date) => void;
  setSearchQuery: (query: string) => void;
}

const TaskTableHeader = ({
  taskType,
  sortingDirection,
  setSortingDirection,
  setSortBy,
  setDateSelectorValue,
  setSearchQuery,
}: TaskTableHeader) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={2} md={1}>
          <Button
            onClick={() =>
              setSortingDirection(
                sortingDirection === SortingDirection.ASCENDING
                  ? SortingDirection.DESCENDING
                  : SortingDirection.ASCENDING
              )
            }
          >
            {sortingDirection === SortingDirection.ASCENDING ? (
              <NorthIcon />
            ) : (
              <SouthIcon />
            )}
          </Button>
        </Grid>
        <Grid item xs={5} md={3}>
          <FormControl fullWidth>
            <InputLabel size="small" id="demo-simple-select-label">
              Sort By
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Sort By"
              onChange={(e) => {
                setSortBy(e?.target?.value as SortingOptions);
              }}
              size="small"
            >
              <MenuItem value={SortingOptions.BY_TITLE}>Title</MenuItem>
              {taskType === TaskType.PENDING ? (
                <MenuItem value={SortingOptions.BY_DUE_DATE}>Due Date</MenuItem>
              ) : (
                <MenuItem value={SortingOptions.BY_COMPLETION_DATE}>
                  Completion Date
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={5} md={3}>
          <DatePicker
            slotProps={{ textField: { size: "small" } }}
            label={
              taskType === TaskType.PENDING ? "Due Date" : "Completion Date"
            }
            onChange={(e) => setDateSelectorValue(new Date(e?.$d || ""))}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            label="Search by title"
            id="outlined-start-adornment"
            size="small"
            sx={{ width: "100%" }}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default function TaskTable({ tasks, type }: TaskTableProps) {
  const dispatch = useAppDispatch();

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
    console.log([sortingDirection, sortBy, dateSelectorValue, searchQuery]);
    let result = tasks;
    if (dateSelectorValue) {
      result = tasks.filter((task) => {
        console.log(
          dateSelectorValue,
          dateSelectorValue.toLocaleDateString(),
          new Date(task.dueDate).toLocaleDateString()
        );
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
    console.log("result", result);

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

  const handleDelete = (task: Task) => {
    dispatch(removeTask(task));
  };

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
  };

  const markCompleted = (task: Task) => {
    const updatedTask = {
      ...task,
      type: TaskType.COMPLETED,
      completionDate: new Date().toISOString(),
    };
    dispatch(updateTask(updatedTask));
  };

  const markPending = (task: Task) => {
    const updatedTask = {
      ...task,
      type: TaskType.PENDING,
      completionDate: undefined,
    };
    dispatch(updateTask(updatedTask));
  };

  const renderPendingTaskOptions = (task: Task) => (
    <>
      <Tooltip title="Mark as completed" arrow>
        <IconButton
          onClick={() => markCompleted(task)}
          sx={{ m: 0.5 }}
          edge="end"
          aria-label="mark-complete"
        >
          <TaskAltIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit Task" arrow>
        <IconButton
          onClick={() => handleEdit(task)}
          sx={{ m: 0.5 }}
          edge="end"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete Task" arrow>
        <IconButton
          onClick={() => handleDelete(task)}
          sx={{ m: 0.5 }}
          edge="end"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const renderCompletedTaskOptions = (task: Task) => (
    <>
      <Tooltip title="Mark Incomplete" arrow>
        <IconButton
          onClick={() => markPending(task)}
          sx={{ m: 0.5 }}
          edge="end"
          aria-label="mark-incomplete"
        >
          <AutorenewIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete Task" arrow>
        <IconButton
          onClick={() => handleDelete(task)}
          sx={{ m: 0.5 }}
          edge="end"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const onUpdateComplete = () => {
    setTaskToEdit(null);
    showAppSnackbarUpdateSuccess();
  };

  return taskToEdit ? (
    <EditTaskForm task={taskToEdit} onComplete={onUpdateComplete} />
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
        {sortedAndFilteredTasks.map((task, index) => {
          const { id, title, description, dueDate, completionDate } = task;
          const labelId = `checkbox-list-label-${id}`;

          return (
            <>
              {
                <ListItem
                  key={id}
                  secondaryAction={
                    <>
                      {type === TaskType.PENDING &&
                        renderPendingTaskOptions(task)}

                      {type === TaskType.COMPLETED &&
                        renderCompletedTaskOptions(task)}
                    </>
                  }
                  disablePadding
                >
                  <ListItemButton role={undefined} dense>
                    <ListItemIcon>
                      <EventIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <>
                          <Typography component="div">
                            <Box sx={{ fontWeight: "bold" }}>{title}</Box>
                          </Typography>
                          <Typography component="div">
                            {type === TaskType.PENDING ? (
                              <Box sx={{ fontWeight: "light" }}>
                                Due On: {new Date(dueDate).toLocaleDateString()}
                              </Box>
                            ) : (
                              completionDate && (
                                <Box sx={{ fontWeight: "light" }}>
                                  Completed On:{" "}
                                  {new Date(
                                    completionDate
                                  ).toLocaleDateString()}
                                </Box>
                              )
                            )}
                          </Typography>
                        </>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {description}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              }
              <Divider />

              <AppSnackbarUpdateSuccess />
            </>
          );
        })}
      </List>
    </>
  );
}
