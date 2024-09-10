import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Outlet, useLoaderData } from "react-router-dom";
import { Header } from "./header";

const theme = createTheme({
  palette: { primary: { main: "#2D2D2D" } },
  typography: {
    fontSize: 16,
    h1: { fontSize: "3.5rem", fontFamily: "spirax" },
    button: { textTransform: "none" },
  },
});

export default function Root() {
  const user = useLoaderData();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </ThemeProvider>
  );
}
