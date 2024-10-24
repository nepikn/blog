import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import api from "../../../src/api";
import Auth from "../../../src/contexts/auth";
import Header from "../../../src/routes/root/header";
import Layout from "../../../src/routes/root/layout";
import { setup } from "../../setup";

describe("Header", () => {
  it("lets authed users open the menu", async () => {
    await setup(
      <Auth.Provider value={true}>
        <Header />
      </Auth.Provider>,
      (user) => user.click(screen.getByRole("button")),
    );

    expect(screen.getByText(/dashboard/i));
  });

  it("lets authed users sign out", async () => {
    vi.mock("localforage");
    vi.mock("axios");

    await setup(
      {
        path: "/",
        element: <Layout />,
        loader: api.auth,
        action: api.auth,
      },
      async (user) => {
        await user.click(await screen.findByRole("button"));
        await user.click(
          screen.getByRole("menuitem", { name: /out/i }),
        );
      },
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
