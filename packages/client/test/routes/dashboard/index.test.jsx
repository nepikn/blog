import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import api from "../../../src/api";
import Auth from "../../../src/contexts/auth";
import {
  Category,
  Component,
} from "../../../src/routes/dashboard";
import { setup } from "../../setup";

describe("Dashboard", () => {
  vi.mock("localforage");

  it("changes category when tabs clicked", async () => {
    setup(
      {
        entry: "/following",
        path: "/",
        element: (
          <Auth.Provider value={{ name: "owo" }}>
            <Component />
          </Auth.Provider>
        ),
        children: [
          {
            path: ":category",
            element: <Category />,
            loader: api.post,
            action: api.post,
          },
        ],
      },
      async (user) => {
        await screen.findByRole("heading", {
          name: /exploring the future/i,
        });
        await user.click(
          await screen.findByRole("tab", { name: /trending/i }),
        );
      },
    );

    expect(
      await screen.findByRole(
        "heading",
        {
          name: /machine learning/i,
        },
        { timeout: 2000 },
      ),
    );
  });
});
