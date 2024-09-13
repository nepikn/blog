import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { auth } from "./handler/actions";
import { getUser } from "./handler/loaders";
import Index from "./routes";
import Error from "./routes/error";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    errorElement: <Error />,
    element: <Root />,
    loader: getUser,
    action: auth,
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Index /> },
          {
            // path: "doggo/:id",
            // element: <Root />,
            // loader: loader,
            // action: action,
          },
        ],
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", console.clear);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
