import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { auth, categoryAction } from "../handler/actions";
import {
  categoryLoader,
  getToken,
  getUser,
} from "../handler/loaders";
import Index from "../routes";
import Dashboard from "../routes/dashboard";
import Category from "../routes/dashboard/children/category";
import Error from "../routes/error";
import Private from "../routes/private";
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
            element: (
              <Private>
                <Dashboard />
              </Private>
            ),
            children: [
              {
                errorElement: <Error />,
                children: [
                  {
                    path: ":category",
                    element: <Category />,
                    loader: categoryLoader,
                    action: categoryAction,
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
