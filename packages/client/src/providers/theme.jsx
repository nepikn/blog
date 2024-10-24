import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import "../index.css";

const CustomLink = forwardRef(function CustomLink(
  { href, ...props },
  ref,
) {
  return <RouterLink ref={ref} to={href} {...props} />;
});

const theme = createTheme({
  palette: {
    primary: { main: "#2D2D2D" },
  },
  typography: {
    button: { textTransform: "none" },
    fontSize: 16,
    h1: {
      fontSize: "3.5rem",
    },
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "1.5rem",
    },
    trademark: {
      fontSize: "3.5rem",
      lineHeight: "1.25",
      fontFamily: "spirax",
    },
  },
  components: {
    MuiLink: {
      defaultProps: { component: CustomLink, underline: "none" },
    },
    MuiButtonBase: {
      defaultProps: { LinkComponent: CustomLink },
    },
  },
});

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
