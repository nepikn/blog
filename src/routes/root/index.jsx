import { Outlet, useLoaderData } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Header } from "./header";

export default function Root() {
  const {} = useLoaderData();

  return (
    <ThemeProvider theme={{}}>
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </ThemeProvider>
  );
}
