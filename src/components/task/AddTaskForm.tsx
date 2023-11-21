import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import NavBar from "../navbar/NavBar";
import {
  AuthenticationResponses,
  AuthenticationStatus,
  signUp,
} from "../../features/authentication/authenticationApi";
import PATHS from "../../routing/paths";
import { createTask, Task, TaskType } from "../../features/task/taskSlice";
import { useAppDispatch } from "../../app/hooks";
import { Snackbar } from "@mui/material";
import { useAppSnackbar } from "../common/AppSnackbar";
import AppDatePicker from "../common/DatePicker";
import dayjs from "dayjs";

const theme = createTheme();

export default function AddTaskForm() {
  const [titleError, setTitleError] = React.useState("");
  const [dueDateError, setDueDateError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [dueDate, setDueDate] = React.useState<Date>(new Date());
  const {
    AppSnackbar: AppSnackbarCreateSuccess,
    showAppSnackbar: showAppSnackbarCreateSuccess,
  } = useAppSnackbar({
    severity: "success",
    message: "Task has been added",
  });

  const [loading, setLoading] = React.useState(false);

  const dispatch = useAppDispatch();

  const [successResponse, setSuccessResponse] =
    React.useState<AuthenticationResponses | null>(null);
  const [alertError, setAlertError] =
    React.useState<AuthenticationResponses | null>(null);

  const validate = ({
    title,
    description,
    dueDate,
  }: {
    title: string;
    description: string;
    dueDate: Date;
  }) => {
    setTitleError(title ? "" : "Title is required");
    setDescriptionError(description ? "" : "Description name is required");
    setDueDateError(dueDate ? "" : "Due Date is required");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { title, description } = {
      title: data.get("title") as string,
      description: data.get("description") as string,
    };

    if (title && description && dueDate) {
      validate({ title, description, dueDate });
      const task = {
        id: new Date().toISOString(),
        title,
        description,
        dueDate: dueDate.toISOString(),
        type: TaskType.PENDING,
      } as Task;

      dispatch(createTask(task));

      showAppSnackbarCreateSuccess();

      setLoading(false);
      return;
    }

    setLoading(false);
    validate({ title, description, dueDate });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          {alertError && (
            <Alert
              severity="error"
              sx={{
                position: "relative",
                top: "80px",
              }}
              onClose={() => {
                setAlertError(null);
              }}
            >
              <AlertTitle>Failed: {alertError.status}</AlertTitle>
              {alertError.message}
            </Alert>
          )}

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 5 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <PlaylistAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add A New Task
            </Typography>
            {successResponse ? (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Account created successfully!{" "}
                  <Link href={PATHS.LOGIN} variant="body2">
                    Go to Sign In
                  </Link>
                </Alert>
              </Box>
            ) : (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={!!titleError}
                      helperText={titleError}
                      name="title"
                      required
                      fullWidth
                      id="title"
                      label="Title"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <AppDatePicker setDate={setDueDate} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={!!descriptionError}
                      helperText={descriptionError}
                      required
                      fullWidth
                      id="description"
                      label="Description"
                      name="description"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add
                </Button>
              </Box>
            )}
          </Box>
          <AppSnackbarCreateSuccess />
        </Container>
      </ThemeProvider>
    </>
  );
}
