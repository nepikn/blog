import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import api from "../api";
import Dashboard from "../routes/dashboard";
import Category from "../routes/dashboard/children/category";
import Error from "../routes/error";
import Private from "../routes/private";
import Root from "../routes/root";
import Layout from "../routes/root/layout";

const router = createBrowserRouter([
  {
    errorElement: <Error root />,
    element: <Layout />,
    loader: api.auth,
    action: api.auth,
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Root />, action: api.auth },
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
                    index: true,
                    loader: Dashboard.indexLoader,
                  },
                  {
                    path: ":category",
                    element: <Category />,
                    loader: api.post,
                    action: api.post,
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
