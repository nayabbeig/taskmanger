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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import NavBar from "../components/navbar/NavBar";

const theme = createTheme();

export default function SignUp() {
  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const [successResponse, setSuccessResponse] = React.useState<any | null>(
    null
  );
  const [alertError, setAlertError] = React.useState<any>(null);

  const validate = ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setFirstNameError(firstName ? "" : "First name is required");
    setLastNameError(lastName ? "" : "Last name is required");
    setEmailError(email ? "" : "Email name is required");
    setPasswordError(password ? "" : "Password name is required");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email, password, firstName, lastName } = {
      email: data.get("email") as string,
      password: data.get("password") as string,
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
    };

    if (email && password && firstName && lastName) {
      validate({ firstName, lastName, email, password });
      const response = { status: 200 }; //await (() => {})(email, password, firstName, lastName);

      setLoading(false);
      if (response?.status === 200) {
        console.log(response);
        setSuccessResponse(response);
      } else if (response?.status === 403) {
        setAlertError(response);
      }
    } else {
      setLoading(false);
      validate({ firstName, lastName, email, password });
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
                setAlertError("");
              }}
            >
              <AlertTitle>Failed: {alertError?.data?.code}</AlertTitle>
              {alertError?.data?.message}
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
                  Account created successfully! A verification link has been
                  send to your email <b>{successResponse?.data?.email}</b>, you
                  need to visit that link to verify your account. You can login
                  to your account once verified.
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
                  <Grid item xs={12}>
                    <TextField
                      error={!!firstNameError}
                      helperText={firstNameError}
                      autoComplete="name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={!!emailError}
                      helperText={emailError}
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
                    <Link href="" variant="body2">
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
