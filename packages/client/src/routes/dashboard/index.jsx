import {
  Card,
  CardActions,
  CardHeader,
  Chip,
  Divider,
  Link,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { capitalCase } from "change-case";
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { H1 } from "../../components";
import { useToggle } from "../../hooks";
import { childRoutes } from "./children/index";

export { Category } from "./children/category";

export function Component({ children }) {
  const location = useLocation();

  const slug = location.pathname.split("/").at(-1);
  const tabIndex = childRoutes.findIndex(
    ({ path }) => path == slug,
  );

  return (
    <Stack
      direction={"row"}
      divider={<Divider flexItem orientation="vertical" />}
      sx={{ flexGrow: 1 }}
    >
      <Stack sx={{ width: 9 / 12 }}>
        <H1 hidden>{childRoutes[tabIndex]?.path}</H1>
        <NavTabs
          value={tabIndex == -1 ? false : tabIndex}
          routes={childRoutes}
        />
        <Outlet />
      </Stack>
      <Stack>
        <Chips
          title={"Recommended Title"}
          labels={[
            "Artificial Intelligence",
            "Work Life",
            "New Fashion",
            "Traveling",
            "Trending",
            "Chatgpt",
            "Vlog",
          ]}
        />
      </Stack>
    </Stack>
  );
}

function NavTabs({ value, routes }) {
  const navigate = useNavigate();

  return (
    <Tabs
      selectionFollowsFocus
      variant="scrollable"
      value={value}
      onChange={(_, value) => navigate(routes[value].path)}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: "appBar",
        bgcolor: "Background",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      {routes.map(({ path }, i) => (
        <Tab
          key={path}
          label={capitalCase(path)}
          component={Link}
          href={path}
          disabled={i > 1}
          sx={{ "&:hover": { bgcolor: "action.hover" } }}
        />
      ))}
    </Tabs>
  );
}

function Chips({ title, labels }) {
  const chips = labels.map((label) => ({
    label,
  }));

  return (
    <Card variant="outlined" sx={{ border: 0 }}>
      <CardHeader
        titleTypographyProps={{ variant: "h3" }}
        title={title}
      />
      <CardActions
        disableSpacing
        direction={"row"}
        sx={{ flexWrap: "wrap", gap: 1 }}
      >
        {chips.map(function SelectableChip({ label }, i) {
          const [selected, select, deselect] = useToggle();

          return (
            <Chip
              key={label}
              label={label}
              onClick={selected ? deselect : select}
              onDelete={selected ? deselect : undefined}
              sx={{
                color: "text.secondary",
                bgcolor: grey[100],
                fontSize: "1rem",
                fontWeight: "light",
                height: "2em",
                borderRadius: 37,
              }}
            ></Chip>
          );
        })}
      </CardActions>
    </Card>
  );
}
