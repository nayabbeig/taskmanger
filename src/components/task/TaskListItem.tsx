import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EventIcon from "@mui/icons-material/Event";

import { Box, Divider, Typography } from "@mui/material";

import {
  Task,
  TaskType,
  removeTask,
  updateTask,
} from "../../features/task/taskSlice";

import { useAppDispatch } from "../../app/hooks";
import PendingTaskOptions from "./PendingTaskOptions";
import CompletedTaskOptions from "./CompletedTaskOptions";

export default function TaskListItem({
  task,
  type,
  handleEdit,
}: {
  task: Task;
  type: TaskType;
  handleEdit: () => void;
}) {
  const dispatch = useAppDispatch();
  const { id, title, description, dueDate, completionDate } = task;

  const handleDelete = () => {
    dispatch(removeTask(task));
  };

  const markCompleted = () => {
    const updatedTask = {
      ...task,
      type: TaskType.COMPLETED,
      completionDate: new Date().toISOString(),
    };
    dispatch(updateTask(updatedTask));
  };

  const markPending = () => {
    const updatedTask = {
      ...task,
      type: TaskType.PENDING,
      completionDate: undefined,
    };
    dispatch(updateTask(updatedTask));
  };

  return (
    <>
      <ListItem
        key={id}
        secondaryAction={
          <>
            {type === TaskType.PENDING ? (
              <PendingTaskOptions
                {...{ markCompleted, handleEdit, handleDelete }}
              />
            ) : (
              <CompletedTaskOptions {...{ markPending, handleDelete }} />
            )}
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
                        {new Date(completionDate).toLocaleDateString()}
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
      <Divider />
    </>
  );
}
