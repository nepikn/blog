import { CircularProgress, Stack } from "@mui/material";
import { lazy, Suspense } from "react";
// import Router from "./router";
import Theme from "./theme";

const Router = lazy(() => import("./router"));
// const Router = lazy(() => delayImport("./router"));

export default function App({ children }) {
  return (
    <Theme>
      <Loading>
        <Router />
      </Loading>
    </Theme>
  );
}

function Loading({ children }) {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <Suspense
        fallback={
          <Stack sx={{ placeItems: "center" }}>
            <CircularProgress />
          </Stack>
        }
      >
        {children}
      </Suspense>
    </Stack>
  );
}

function delayImport(path) {
  return new Promise((res) => {
    setTimeout(() => res(import(path)), 80);
  });
}
