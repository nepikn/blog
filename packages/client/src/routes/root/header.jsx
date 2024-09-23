import {
  ArrowForward,
  Dashboard,
  Equalizer,
  LogoutOutlined,
  Settings,
  Title,
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
import { useToggle } from "../../hooks";

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
      <Link href="/">
        <Trademark />
      </Link>
      {user ? <AccountMenu /> : <SignIn err={err} />}
    </StyledHeader>
  );
}

export function AccountMenu({ children }) {
  const [menuOpen, handleOpen, handleClose] = useToggle();
  const anchorEl = useRef(null);

  const items = [
    {
      text: "dashboard",
      icon: <Dashboard />,
    },
    {
      text: "your-post",
      icon: <Title />,
    },
    {
      text: "stat",
      icon: <Equalizer />,
    },
    {
      text: "settings",
      icon: <Settings />,
    },
  ].map((icon, i) => ({ disabled: i > 0, ...icon }));

  return (
    <>
      <Tooltip title={capitalCase(AccountMenu.name)}>
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
  const [opening, open, close] = useToggle();

  return (
    <>
      <Button
        variant="contained"
        onClick={open}
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
        open={opening}
        onClose={close}
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
