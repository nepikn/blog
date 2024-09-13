import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Outlet, useLoaderData } from "react-router-dom";
import { Header } from "./header";
import { useActionData } from "react-router-dom";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

const CustomLink = forwardRef(function CustomLink(
  { href, ...props },
  ref
) {
  return <RouterLink ref={ref} to={href} {...props}></RouterLink>;
});

const theme = createTheme({
  palette: { primary: { main: "#2D2D2D" } },
  typography: {
    fontSize: 16,
    button: { textTransform: "none" },
    trademark: {
      fontSize: "3.5rem",
      lineHeight: "1.25",
      fontFamily: "spirax",
    },
  },
  components: {
    MuiLink: {
      defaultProps: { underline: "hover", component: CustomLink },
    },
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
