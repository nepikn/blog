import { redirect } from "react-router-dom";
import api from "../api";
import { childRoutes } from "./dashboard/children";
import Error from "./error";
import Private from "./private";
import Layout from "./root/layout";

export default {
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
          lazy: () => import("./root"),
          action: api.auth,
        },
        {
          path: "dashboard",
          lazy: async () => {
            const { Component } = await import("./dashboard");
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
};
