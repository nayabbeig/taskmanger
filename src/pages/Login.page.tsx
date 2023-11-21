import * as React from "react";
// import { useHistory } from "react-router-dom";
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
import { Alert, AlertTitle } from "@mui/material";
import {
  AuthenticationResponses,
  signIn,
} from "../features/authentication/authenticationApi";
import PATHS from "../routing/paths";
import { redirect, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { reinitiateState } from "../features/task/taskSlice";

const theme = createTheme();

export default function Login() {
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [successResponse, setSuccessResponse] =
    React.useState<AuthenticationResponses | null>(null);
  const [alertError, setAlertError] =
    React.useState<AuthenticationResponses | null>(null);

  const validate = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setUsernameError(username ? "" : "Username name is required");
    setPasswordError(password ? "" : "Password name is required");
    return !!(username && password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { username, password } = {
      username: data.get("username") as string,
      password: data.get("password") as string,
    };
    if (username && password) {
      validate({ username, password });
      const response = signIn(username, password);

      if (response.status === 200) {
        setSuccessResponse(response);
        dispatch(reinitiateState());
        navigate(PATHS.HOME);
      } else if (response.status >= 400) {
        setAlertError(response);
      }
    } else {
      validate({ username, password });
    }
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  Don't have account?
                </Grid>
                <Grid item onClick={() => {}}>
                  <Link href={PATHS.SIGNUP} variant="body2">
                    Go To Signup
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
