import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface AppSnackbarProps {
  severity: AlertColor;
  message: string;
}

export const useAppSnackbar = ({ severity, message }: AppSnackbarProps) => {
  const [open, setOpen] = React.useState(false);

  const showAppSnackbar = () => setOpen(true);

  const AppSnackbar = () => {
    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
    };

    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    );
  };

  return { AppSnackbar, showAppSnackbar };
};
