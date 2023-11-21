import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Tooltip } from "@mui/material";

interface PendingTaskOptionProps {
  markCompleted: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

export default function PendingTaskOptions({
  markCompleted,
  handleEdit,
  handleDelete,
}: PendingTaskOptionProps) {
  return (
    <>
      <Tooltip title="Mark as completed" arrow>
        <IconButton
          onClick={markCompleted}
          sx={{ m: 0.5 }}
          edge="end"
          aria-label="mark-complete"
        >
          <TaskAltIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit Task" arrow>
        <IconButton
          onClick={handleEdit}
          sx={{ m: 0.5 }}
          edge="end"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete Task" arrow>
        <IconButton
          onClick={handleDelete}
          sx={{ m: 0.5 }}
          edge="end"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
