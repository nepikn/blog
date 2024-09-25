import { CircularProgress } from "@mui/material";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import api from "../api";
import { childRoutes } from "../routes/dashboard/children";
import Error from "../routes/error";
import Private from "../routes/private";
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
          {
            index: true,
            lazy: () => import("../routes/root"),
            action: api.auth,
          },
          {
            path: "dashboard",
            lazy: async () => {
              const { Component } = await import(
                "../routes/dashboard"
              );
              return {
                element: (
                  <Private>
                    <Component />
                  </Private>
                ),
              };
            },
            children: [
              {
                errorElement: <Error />,
                children: [
                  {
                    index: true,
                    loader: () => redirect(childRoutes[0].path),
                  },
                  {
                    path: ":category",
                    lazy: async () => {
                      const { Category } = await import(
                        "../routes/dashboard"
                      );
                      return {
                        element: <Category />,
                      };
                    },
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

export default function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<CircularProgress />}
    />
  );
}
