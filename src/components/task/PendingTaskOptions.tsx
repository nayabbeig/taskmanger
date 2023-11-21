import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Grid, Menu, MenuItem, Tooltip } from "@mui/material";

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Grid sx={{ display: { xs: "none", md: "block" } }}>
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
      </Grid>
      <Grid sx={{ display: { xs: "block", md: "none" } }}>
        <IconButton
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ m: 0.5 }}
          edge="end"
          aria-label="mark-complete"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={markCompleted}>Mark Completed</MenuItem>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Grid>
    </>
  );
}
