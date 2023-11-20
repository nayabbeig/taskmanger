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

const theme = createTheme();

export default function Login() {
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [successResponse, setSuccessResponse] = React.useState<any | null>(
    null
  );
  const [alertError, setAlertError] = React.useState<any>(null);

  const validate = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setEmailError(email ? "" : "Email name is required");
    setPasswordError(password ? "" : "Password name is required");
    return !!(email && password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email, password } = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    if (email && password) {
      validate({ email, password });
      const response = { status: 200 }; //await login({ email, password });

      if (response.status === 200) {
        setSuccessResponse(response);
        // history.push(path.ui.root);
      } else if (response.status >= 400) {
        setAlertError(response);
      }
    } else {
      validate({ email, password });
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
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
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
                  <Link href="" variant="body2">
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
