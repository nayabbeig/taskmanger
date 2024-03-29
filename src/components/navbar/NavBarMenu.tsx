import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PATHS from "../../routing/paths";
import NavItem, { NavItemType } from "./NavItem";
import { getCurrentUser } from "../../features/task/taskApi";
import { Avatar, ListItemAvatar, Typography } from "@mui/material";
import { logout } from "../../features/authentication/authenticationApi";

const navItems: NavItemType[] = [
  {
    id: "addTask",
    label: "Add Task",
    Icon: <PlaylistAddIcon />,
    path: PATHS.ADD_TASK,
  },
  {
    id: "pendingTasks",
    label: "Pending Tasks",
    Icon: <FormatListNumberedIcon />,
    path: PATHS.PENDING_TASKS,
  },
  {
    id: "completedTasks",
    label: "CompletedTasks",
    Icon: <PlaylistAddCheckIcon />,
    path: PATHS.COMPLETED_TASKS,
  },
];

const NavBarMenu = () => {
  const currentUser = getCurrentUser();
  const fullName = `${currentUser?.firstName} ${currentUser?.lastName}`;
  const username = currentUser?.username;
  const handleLogout = () => {
    logout();
    window.location.href = PATHS.LOGIN;
  };
  return (
    <div>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="" />
          </ListItemAvatar>
          <ListItemText
            primary={fullName}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {username}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        {navItems.map((item) => (
          <NavItem key={item.id} {...item} />
        ))}
      </List>
      <Divider />
      <List>
        <NavItem
          onClick={handleLogout}
          label="Logout"
          id="logout"
          path=""
          Icon={<LogoutIcon />}
        />
      </List>
    </div>
  );
};

export default NavBarMenu;
