import "@testing-library/jest-dom/vitest";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { isValidElement } from "react";
import {
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { afterEach } from "vitest";

afterEach(cleanup);

/**
 * @param {React.JSX.Element | import('react-router-dom').RouteObject | import('react-router-dom').RouteObject[]} elemOrRoutes
 * @param {(user: import("@testing-library/user-event").UserEvent)} update
 * */
export async function setup(
  elemOrRoutes,
  update = async () => {},
) {
  const user = userEvent.setup();
  const routes = Array.isArray(elemOrRoutes)
    ? elemOrRoutes
    : [
        Object.assign(
          { path: "/" },
          isValidElement(elemOrRoutes)
            ? { element: elemOrRoutes }
            : elemOrRoutes,
        ),
      ];
  const router = createMemoryRouter(routes);
  const result = render(<RouterProvider router={router} />);

  await update(user);

  return { user, ...result };
}
