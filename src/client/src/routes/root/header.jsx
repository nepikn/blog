import "@fontsource/roboto";
import "@fontsource/spirax";
import { ArrowForward } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { redirect } from "react-router-dom";
import { Form } from "react-router-dom";

const StyledHeader = styled("header")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "8rem",
  paddingInline: "3em",
  background: "#fcfcfc",
  borderBottom: "1px solid #DBDBDB",
});

const Trademark = () => (
  <Typography variant="trademark">Mindly</Typography>
);

export function Header({ user, err }) {
  return (
    <StyledHeader>
      <Trademark />
      <Button
        onClick={() => {
          localStorage.clear();
          redirect("");
        }}
      >
        !
      </Button>
      {user ? <Avatar /> : <SignIn err={err} />}
    </StyledHeader>
  );
}

export function SignIn({ err }) {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [error, setError] = useState(!!err);

  function handleOpen() {
    setDialogOpened(true);
  }

  function handleClose() {
    setDialogOpened(false);
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        endIcon={<ArrowForward />}
        sx={{
          borderRadius: "33px",
          width: "9em",
          height: "2.5em",
          fontSize: "1.5rem",
        }}
      >
        Get Started
      </Button>
      <Dialog
        maxWidth="xs"
        open={dialogOpened}
        onClose={handleClose}
        component={Form}
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
            variant="standard"
            margin="dense"
          />
          <TextField
            required
            autoFocus
            name="password"
            label="Password"
            type="password"
            variant="standard"
            margin="dense"
            error={!!err}
            helperText={err ? "Wrong :(" : ""}
            // onChange={() => setError(false)}
          />
        </DialogContent>
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
      </Dialog>
    </>
  );
}
