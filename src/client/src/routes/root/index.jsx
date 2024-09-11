import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Outlet, useLoaderData } from "react-router-dom";
import { Header } from "./header";
import { useActionData } from "react-router-dom";

const theme = createTheme({
  palette: { primary: { main: "#2D2D2D" } },
  typography: {
    fontSize: 16,
    button: { textTransform: "none" },
    trademark: { fontSize: "3.5rem", fontFamily: "spirax" },
  },
});

export default function Root() {
  const user = useLoaderData();
  const err = useActionData();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header user={user} err={err} />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </ThemeProvider>
  );
}
