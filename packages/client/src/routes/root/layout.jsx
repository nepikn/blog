import { Divider, Stack } from "@mui/material";
import {
  Outlet,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import Auth from "../../contexts/auth";
import { Header } from "./header";

export default function Layout() {
  const { data: user } = useLoaderData();
  const err = useActionData();

  return (
    <Auth.Provider value={user}>
      <Stack divider={<Divider />}>
        <Header err={err} />
        <Stack component={"main"} sx={{ flexGrow: 1 }}>
          <Outlet />
        </Stack>
      </Stack>
    </Auth.Provider>
  );
}
