import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    dir: "./test",
    environment: "jsdom",
    setupFiles: "./test/setup.jsx",
  },
});
