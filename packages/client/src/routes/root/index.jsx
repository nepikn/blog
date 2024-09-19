import { Divider, Stack } from "@mui/material";
import {
  Outlet,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { Header } from "./header";

export default function Root() {
  const { data: user } = useLoaderData();
  const err = useActionData();

  return (
    <Stack divider={<Divider />} sx={{ minHeight: "100vh" }}>
      <Header user={user} err={err} />
      <Stack component={"main"} sx={{ flexGrow: 1 }}>
        <Outlet />
      </Stack>
    </Stack>
  );
}
