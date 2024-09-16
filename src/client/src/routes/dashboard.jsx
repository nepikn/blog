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

  return (
    <>
      <Stack
        direction={"row"}
        divider={<Divider orientation="vertical" />}
        sx={{ height: "57.25rem" }}
      >
        <Stack>
          <NavTabs slug={slug} />
        </Stack>
      </Stack>
    </>
  );
}

function NavTabs({ slug }) {
  const navigate = useNavigate();

  // const tabs = dashboardRoutes.map(({ path }) => ({
  //   key: path,
  //   href: path,
  //   label: capitalCase(path),
  // }));

  // const [value, setValue] = useState(
  //   tabs.findIndex(({ key }) => key == hash)
  // );
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const tabIndex = childRoutes.findIndex(
    ({ path }) => path == slug
  );

  return (
    <>
      <Tabs
        selectionFollowsFocus
        value={tabIndex == -1 ? false : tabIndex}
        onChange={(_, value) => navigate(childRoutes[value].path)}
        sx={(theme) => ({
          borderBottom: 1,
          borderColor: "text.secondary",
        })}
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
      <Outlet />
    </>
  );
}
