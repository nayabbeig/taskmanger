import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  AuthenticationResponses,
  AuthenticationStatus,
  signUp,
} from "../features/authentication/authenticationApi";
import PATHS from "../routing/paths";

const theme = createTheme();

export default function SignUp() {
  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const [successResponse, setSuccessResponse] =
    React.useState<AuthenticationResponses | null>(null);
  const [alertError, setAlertError] =
    React.useState<AuthenticationResponses | null>(null);

  const validate = ({
    firstName,
    lastName,
    username,
    password,
  }: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
  }) => {
    setFirstNameError(firstName ? "" : "First name is required");
    setLastNameError(lastName ? "" : "Last name is required");
    setUsernameError(username ? "" : "Username name is required");
    setPasswordError(password ? "" : "Password name is required");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { username, password, firstName, lastName } = {
      firstName: data.get("firstName") as string,
      username: data.get("username") as string,
      password: data.get("password") as string,
      lastName: data.get("lastName") as string,
    };

    if (username && password && firstName && lastName) {
      validate({ firstName, lastName, username, password });
      const { data, status, message } = signUp({
        username,
        password,
        firstName,
        lastName,
      });
      setLoading(false);
      if (status === AuthenticationStatus.SUCCESS) {
        setSuccessResponse({ data, status, message });
        return;
      }

      if (status >= 300) {
        setAlertError({ data, status, message });
      }

      return;
    }

    setLoading(false);
    validate({ firstName, lastName, username, password });
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
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
                      error={!!firstNameError}
                      helperText={firstNameError}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={!!lastNameError}
                      helperText={lastNameError}
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={!!usernameError}
                      helperText={usernameError}
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={!!passwordError}
                      helperText={passwordError}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href={PATHS.LOGIN} variant="body2">
                      Go to Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
