import { redirect } from "react-router-dom";
import api from "../api";
import { childRoutes } from "./dashboard/children";
import Error from "./error";
import Private from "./private";
import Layout from "./root/layout";

/** @type {import("react-router-dom").RouteObject} */
export default [
  {
    errorElement: <Error root />,
    element: <Layout />,
    loader: api.auth,
    action: api.auth,
    children: getIndexedChildren(
      {
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
        children: getIndexedChildren(
          {
            loader: () => redirect(childRoutes[0].path),
          },
          {
            path: ":category",
            lazy: async () => {
              const { Category } = await import("./dashboard");
              return {
                element: <Category />,
              };
            },
            loader: api.post,
            action: api.post,
          },
        ),
      },
    ),
  },
];

/** @param {import("react-router-dom").IndexRouteObject} indexProps */
/** @param {import("react-router-dom").NonIndexRouteObject[]} children */
function getIndexedChildren(indexProps, ...children) {
  return [
    {
      errorElement: <Error />,
      children: [
        {
          index: true,
          ...indexProps,
        },
        ...children,
      ],
    },
  ];
}
