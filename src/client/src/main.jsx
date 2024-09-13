import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./providers/router";
import Theme from "./providers/theme";

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", console.clear);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <Router />
    </Theme>
  </StrictMode>
);
