import { ArrowForward } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import { useFetcher } from "react-router-dom";
import { Trademark } from ".";
import Auth from "../contexts/auth";
import { useToggle } from "../hooks";

export default function SignIn({ open: opening }) {
  const [open, setOpen, setClose] = useToggle(opening);
  const user = useContext(Auth);

  return (
    <>
      <Button
        variant="contained"
        onClick={setOpen}
        endIcon={<ArrowForward />}
        disabled={Boolean(user)}
        sx={{
          borderRadius: "33px",
          width: "9em",
          height: "2.5em",
          fontSize: "1.5rem",
        }}
      >
        Get Started
      </Button>
      <SignInDialog open={open} setClose={setClose} />
    </>
  );
}

function SignInDialog({ open, setClose }) {
  const fetcher = useFetcher();

  const error = Boolean(fetcher.data);
  const passwordProps = error && {
    error,
    helperText: "Wrong :(",
    onChange: unsetHeplerText,
  };

  function unsetHeplerText() {
    return fetcher.submit(null, { method: "put" });
  }

  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={() => (setClose(), unsetHeplerText())}
      component={fetcher.Form}
      method="post"
    >
      <DialogTitle sx={{ paddingBottom: 0 }}>
        <Trademark />
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <DialogContentText sx={{ color: "#6767" }}>
          Inspire Someone by your Stories and Writing
        </DialogContentText>
        <TextField
          required
          defaultValue={"owo"}
          name="name"
          label="Username"
          type="text"
          autoComplete="username"
          variant="standard"
          margin="dense"
        />
        <TextField
          data-testid="pswd"
          required
          autoFocus
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          margin="dense"
          {...passwordProps}
        />
        <DialogActions>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ background: "#484848" }}
          >
            Sign in
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
