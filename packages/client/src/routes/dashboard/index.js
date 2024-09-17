import { kebabCase } from "change-case";
import { getAllPosts } from "../../handler/loaders";
import Dashboard from "../dashboard";
import ArtificialIntelligence from "./artificial-intelligence";
import Following from "./following";
import HollywoodHappen from "./hollywood-happen";
import Horoscope from "./horoscope";
import Trending from "./trending";

/** @type {import("react-router-dom").RouteObject[]} */
export const childRoutes = Object.entries({
  Following,
  Trending,
  ArtificialIntelligence,
  HollywoodHappen,
  Horoscope,
}).map(([key, Component]) => ({
  // key: pascalCase(key),
  Component,
  path: kebabCase(key),
  loader: getAllPosts,
}));

export default {
  path: "/dashboard",
  Component: Dashboard,
  // loader: loader,
  // action: action,
  children: childRoutes,
};
