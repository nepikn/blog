import "@fontsource/roboto";
import "@fontsource/spirax";
import {
  ArrowForward,
  EqualizerOutlined,
  LogoutOutlined,
  PersonOutlined,
  SettingsOutlined,
  TitleOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { capitalCase } from "change-case";
import { useContext, useRef } from "react";
import { Form } from "react-router-dom";
import Auth from "../../contexts/auth";
import { useToggle } from "../../handler/hooks";

const StyledHeader = styled("header")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingInline: "3rem",
  background: "#fcfcfc",
});

const Trademark = () => (
  <Typography variant="trademark">Mindly</Typography>
);

export function Header({ err }) {
  const user = useContext(Auth);

  return (
    <StyledHeader sx={{ paddingBlock: user ? "1rem" : "2rem" }}>
      <Trademark />
      {user ? <UserMenu /> : <SignIn err={err} />}
    </StyledHeader>
  );
}

export function UserMenu({ children }) {
  const [menuOpen, handleOpen, handleClose] = useToggle();
  const anchorEl = useRef(null);

  const items = [
    {
      text: "profile",
      icon: <PersonOutlined />,
    },
    {
      text: "your-post",
      icon: <TitleOutlined />,
    },
    {
      text: "stat",
      icon: <EqualizerOutlined />,
    },
    {
      text: "settings",
      icon: <SettingsOutlined />,
    },
  ].map((i) => ({ disabled: true, ...i }));

  return (
    <>
      <Tooltip title="Account Menu">
        <IconButton ref={anchorEl} onClick={handleOpen}>
          <Avatar />
        </IconButton>
      </Tooltip>
      <Menu
        open={menuOpen}
        anchorEl={anchorEl.current}
        onClick={handleClose}
      >
        <Form>
          <Items items={items} />
        </Form>
      </Menu>
    </>
  );
}

function Items({ items }) {
  return (
    <>
      {items.map(({ text, icon, ...props }, i) => (
        <MenuItem
          key={text}
          component={Link}
          href={`/${text}`}
          {...props}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>
            {capitalCase(text.replace("-", " "))}
          </ListItemText>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem
        component={Button}
        type="submit"
        formMethod="delete"
        fullWidth
        sx={{ "*": { color: "warning.main" } }}
      >
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText>Log out</ListItemText>
      </MenuItem>
    </>
  );
}

export function SignIn({ err }) {
  const [dialogOpen, handleOpen, handleClose] = useToggle();

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
        open={dialogOpen}
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
    </>
  );
}
