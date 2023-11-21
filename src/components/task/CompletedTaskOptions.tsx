import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import { Grid, Menu, MenuItem, Tooltip } from "@mui/material";
import { GridMoreVertIcon } from "@mui/x-data-grid";

interface PendingTaskOptionProps {
  markPending: () => void;
  handleDelete: () => void;
}

export default function CompletedTaskOptions({
  markPending,
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
          <GridMoreVertIcon />
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
          <MenuItem onClick={markPending}>Mark Incomplete</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Grid>
    </>
  );
}
