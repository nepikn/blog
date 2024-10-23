import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import api from "../../../../src/api";
import Auth from "../../../../src/contexts/auth";
import { Category } from "../../../../src/routes/dashboard";
import { setup } from "../../../setup";

describe("Post", () => {
  it("changes icons and numbers if reacted", async () => {
    vi.mock("localforage");

    await setup(
      {
        path: "/",
        element: (
          <Auth.Provider value={{ name: "owo" }}>
            <Category />
          </Auth.Provider>
        ),
        loader: api.post,
        action: api.post,
      },
      async (user) =>
        user.click(
          await screen.findByRole("button", { name: /117/i }),
        ),
    );

    expect(
      await screen.findByRole("button", { name: /118/i }),
    ).toContainElement(screen.getByTestId("EmojiEmotionsIcon"));
  });
});
