import { ArrowForward } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useFetcher } from "react-router-dom";
import typeOf from "type-detect";
import Auth from "../contexts/auth";
import { useTitle, useToggle } from "../hooks";

export function Trademark() {
  return <Typography variant="trademark">Mindly</Typography>;
}

export function SignIn({ open: opening }) {
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

export function SignInDialog({ open, setClose }) {
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

export const H1 = ({ children, hidden, ref, ...props }) => {
  useTitle(getTextContent(children));

  return (
    <Typography variant="h1" hidden={hidden} ref={ref} {...props}>
      {children}
    </Typography>
  );
};

function getTextContent(component) {
  const type = typeOf(component);

  switch (type) {
    case "Array": {
      return component
        .map((child) => getTextContent(child))
        .join(" ");
    }
    case "Object": {
      return getTextContent(component.props.children);
    }
    case "undefined": {
      return "";
    }
    case "string": {
      return component;
    }
    default:
      throw new Error(`unhandled type: ${type}`);
  }
}
