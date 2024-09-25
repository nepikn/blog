import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";
// import Router from "./router";
import Theme from "./theme";

const Router = lazy(() => import("./router"));
// const Router = lazy(() => delayImport("./router"));

export default function App({ children }) {
  return (
    <Theme>
      <Suspense fallback={<CircularProgress />}>
        <Router />
      </Suspense>
    </Theme>
  );
}

function delayImport(path) {
  return new Promise((res) => {
    setTimeout(() => res(import(path)), 800);
  });
}
