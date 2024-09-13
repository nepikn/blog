import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { auth } from "../handler/actions";
import { getUser } from "../handler/loaders";
import Index from "../routes";
import Dashboard from "../routes/dashboard";
import Profile from "../routes/profile";
import Root from "../routes/root";
import Error from "../routes/error";

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
            path: "/dashboard",
            element: <Dashboard />,
            // loader: loader,
            // action: action,
          },
          {
            path: "/profile",
            element: <Profile />,
            // loader: loader,
            // action: action,
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
