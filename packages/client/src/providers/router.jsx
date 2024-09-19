import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { auth } from "../handler/actions";
import { getPostsByCategory, getUser } from "../handler/loaders";
import Index from "../routes";
import Category from "../routes/dashboard/children/category";
import Dashboard from "../routes/dashboard";
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
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              {
                errorElement: <Error />,
                children: [
                  {
                    path: ":category",
                    element: <Category />,
                    loader: getPostsByCategory,
                  },
                ],
              },
            ],
          },
          {
            path: "profile",
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
