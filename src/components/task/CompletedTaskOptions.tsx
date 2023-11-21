import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import { Tooltip } from "@mui/material";

interface PendingTaskOptionProps {
  markPending: () => void;
  handleDelete: () => void;
}

export default function CompletedTaskOptions({
  markPending,
  handleDelete,
}: PendingTaskOptionProps) {
  return (
    <>
      <Tooltip title="Mark Incomplete" arrow>
        <IconButton
          onClick={markPending}
          sx={{ m: 0.5 }}
          edge="end"
          aria-label="mark-incomplete"
        >
          <AutorenewIcon />
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
