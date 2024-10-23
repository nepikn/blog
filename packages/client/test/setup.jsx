import "@testing-library/jest-dom/vitest";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { isValidElement } from "react";
import {
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import typeOf from "type-detect";
import { afterEach } from "vitest";

afterEach(cleanup);

/**
 * @typedef {{ entry: string } & import('react-router-dom').RouteObject} TestRoute
 * @param {React.JSX.Element | TestRoute | TestRoute[]} elemOrTestRoutes
 * @param {(user: import("@testig-library/user-event").UserEvent)} update
 * */
export async function setup(
  elemOrTestRoutes,
  update = async () => {},
) {
  const user = userEvent.setup();
  const result = getRenderResult(elemOrTestRoutes);

  await update(user);

  return { user, ...result };
}

function getRenderResult(elemOrRoutes) {
  /** @type {import('react-router-dom').RouteObject[]} */
  const routes = getRoutes(elemOrRoutes);
  const router = createMemoryRouter(routes, {
    initialEntries: getEntries(routes),
  });

  return render(<RouterProvider router={router} />);
}

function getRoutes(elemOrRoutes) {
  switch (typeOf(elemOrRoutes)) {
    case "Array":
      return elemOrRoutes;
    case "Object":
      return [
        isValidElement(elemOrRoutes)
          ? { path: "/", element: elemOrRoutes }
          : elemOrRoutes,
      ];
    default:
      throw new Error("unhandled case");
  }
}

function getEntries(routes) {
  const entries = routes
    .map((route) => route.entry)
    .filter((entry) => entry);

  return entries.length ? entries : ["/"];
}
