import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

const CustomLink = forwardRef(function CustomLink(
  { href, ...props },
  ref,
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

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
