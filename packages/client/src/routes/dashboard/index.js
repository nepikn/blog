import { getPostsByCategory } from "../../handler/loaders";
import Dashboard from "../dashboard";
import Error from "../error";
import Category from "./following";

/** @type {import("react-router-dom").RouteObject[]} */
export const childRoutes = [
  "following",
  "trending",
  "artificial-intelligence",
  "hollywood-happen",
  "horoscope",
].map((p) => ({ path: p }));

// Object.entries({
//   Following: Category,
//   Trending,
//   ArtificialIntelligence,
//   HollywoodHappen,
//   Horoscope,
// }).map(([key, Component]) => ({
//   // key: pascalCase(key),
//   Component,
//   path: kebabCase(key),
//   loader: getAllPosts,
// }));

export default {
  path: "dashboard",
  Component: Dashboard,
  children: [
    {
      ErrorBoundary: Error,
      children: [
        {
          path: ":category",
          Component: Category,
          loader: getPostsByCategory,
        },
      ],
    },
  ],
};
