import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { action, auth } from "./handler/actions";
import { getUser, loader } from "./handler/loaders";
import Error from "./routes/error";
import Root from "./routes/root";
import Index from "./routes";

const router = createBrowserRouter([
  {
    errorElement: <Error />,
    element: <Root />,
    loader: getUser,
    action: action,
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "doggo/:id",
            element: <Root />,
            loader: loader,
            action: action,
          },
        ],
      },
    ],
  },
  { action: auth, path: "auth/" },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
