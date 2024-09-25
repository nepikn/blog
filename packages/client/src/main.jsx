import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./providers/router";
import Theme from "./providers/theme";

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", console.clear);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>,
);
