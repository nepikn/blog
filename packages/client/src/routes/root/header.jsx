import {
  Dashboard,
  Equalizer,
  LogoutOutlined,
  Settings,
  Title,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Tooltip,
} from "@mui/material";
import { capitalCase } from "change-case";
import { useContext, useRef } from "react";
import { Form } from "react-router-dom";
import { Trademark } from "../../components";
import Auth from "../../contexts/auth";
import { useToggle } from "../../hooks";

const StyledHeader = styled("header")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingInline: "3rem",
  background: "#fcfcfc",
});

export function Header({ err }) {
  const user = useContext(Auth);

  return (
    <StyledHeader sx={{ paddingBlock: user ? "1rem" : "2rem" }}>
      <Link href="/">
        <Trademark />
      </Link>
      {user ? <AccountMenu /> : null}
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
