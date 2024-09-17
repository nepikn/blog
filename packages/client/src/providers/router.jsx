import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { auth } from "../handler/actions";
import { getUser } from "../handler/loaders";
import Index from "../routes";
import { default as dashboardRoute } from "../routes/dashboard/index";
import Error from "../routes/error";
import Profile from "../routes/profile";
import Root from "../routes/root";

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
          dashboardRoute,
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
