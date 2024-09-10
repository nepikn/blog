import "@fontsource/roboto";
import "@fontsource/spirax";
import { ArrowForward } from "@mui/icons-material";
import {
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
  <Typography variant="h1">Mindly</Typography>
);

export function Header({ children }) {
  const [dialogOpened, setDialogOpened] = useState(false);

  function handleOpen() {
    setDialogOpened(true);
  }

  function handleClose() {
    setDialogOpened(false);
  }

  return (
    <StyledHeader>
      <Trademark />
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
        PaperProps={{
          component: Form,
          method: "post",
          action: "auth/",
        }}
      >
        <DialogTitle sx={{ paddingBottom: 0 }}>
          <Trademark />
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText sx={{ color: "#6767" }}>
            Inspire Someone by your Stories and Writing
          </DialogContentText>
          <TextField
            autoFocus
            required
            name="username"
            label="Username"
            type="text"
            variant="standard"
            margin="dense"
          />
          <TextField
            required
            name="password"
            label="Password"
            type="password"
            variant="standard"
            margin="dense"
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
    </StyledHeader>
  );
}
