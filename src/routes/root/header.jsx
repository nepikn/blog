import "@fontsource/roboto";
import "@fontsource/spirax";
import { Cancel } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Form } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 4em;
  font-size: 24px;
  margin-inline: 3em;
  background: #fcfcfc;
`;

const Trademark = styled.div`
  font-family: "Spirax";
  font-size: 56px;
`;

export function Header({ children }) {
  const [dialogopened, setDialogOpened] = useState(false);

  function handleOpen() {
    setDialogOpened(true);
  }

  function handleClose() {
    setDialogOpened(false);
  }

  return (
    <StyledHeader>
      <Trademark>Mindly</Trademark>
      <Button variant="contained" onClick={handleOpen}>
        Get Started
      </Button>
      <Dialog maxWidth="xs" open={dialogopened} onClose={handleClose}>
        <DialogTitle>Sign in or create an account</DialogTitle>
        <DialogContent>
          {/* <DialogContentText></DialogContentText> */}
          <Form method="post" action="auth">
            <TextField
              autoFocus
              required
              margin="dense"
              name="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </StyledHeader>
  );
}
