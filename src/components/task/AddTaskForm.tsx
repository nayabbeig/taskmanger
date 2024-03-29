import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { AuthenticationResponses } from "../../features/authentication/authenticationApi";
import { createTask, Task, TaskType } from "../../features/task/taskSlice";
import { useAppDispatch } from "../../app/hooks";
import { useAppSnackbar } from "../common/AppSnackbar";
import AppDatePicker from "../common/DatePicker";

const theme = createTheme();

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: Date;
}

const FormHeader = () => (
  <>
    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
      <PlaylistAddIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Add A New Task
    </Typography>
  </>
);

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

  const dispatch = useAppDispatch();

  const [successResponse, setSuccessResponse] =
    React.useState<AuthenticationResponses | null>(null);
  const [alertError, setAlertError] =
    React.useState<AuthenticationResponses | null>(null);

  const validate = ({ title, description, dueDate }: TaskFormData) => {
    setTitleError(title ? "" : "Title is required");
    setDescriptionError(description ? "" : "Description name is required");
    setDueDateError(dueDate ? "" : "Due Date is required");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title") as string;
    const description = data.get("description") as string;

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
      return;
    }
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
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormHeader />
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
          </Box>
          <AppSnackbarCreateSuccess />
        </Container>
      </ThemeProvider>
    </>
  );
}
