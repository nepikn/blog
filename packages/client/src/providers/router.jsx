import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { auth } from "../handler/actions";
import { getPostsByCategory, getUser } from "../handler/loaders";
import Index from "../routes";
import Dashboard from "../routes/dashboard";
import Category from "../routes/dashboard/children/category";
import Error from "../routes/error";
import Root from "../routes/root";

const router = createBrowserRouter([
  {
    errorElement: <Error root />,
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
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
