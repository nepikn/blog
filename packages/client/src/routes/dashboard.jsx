import { Divider, Link, Stack, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { H1 } from "../components/util";
import { childRoutes } from "./dashboard/index";

export default function Dashboard({ children }) {
  const location = useLocation();

  const slug = location.pathname.split("/").at(-1);
  const tabIndex = childRoutes.findIndex(
    ({ path }) => path == slug,
  );

  return (
    <>
      <Stack
        direction={"row"}
        divider={<Divider orientation="vertical" />}
        sx={{ height: "57.25rem" }}
      >
        <Stack>
          <H1 hidden>{childRoutes[tabIndex]?.path}</H1>
          <NavTabs value={tabIndex == -1 ? false : tabIndex} />
          <Outlet />
        </Stack>
      </Stack>
    </>
  );
}

function NavTabs({ value }) {
  const navigate = useNavigate();

  return (
    <>
      <Tabs
        selectionFollowsFocus
        value={value}
        onChange={(_, value) => navigate(childRoutes[value].path)}
        sx={{
          borderBottom: 1,
          borderColor: "text.secondary",
        }}
      >
        {childRoutes.map(({ path }, i) => (
          <Tab
            key={path}
            label={capitalCase(path)}
            component={Link}
            href={path}
            disabled={i > 1}
          />
        ))}
      </Tabs>
    </>
  );
}
