import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Auth from "../../src/contexts/auth";
import Error from "../../src/routes/error";
import Private from "../../src/routes/private";
import { setup } from "../setup";

describe("Private", () => {
  it("prevents guests from accessing children", async () => {
    await setup({
      path: "/",
      errorElement: <Error log={false} />,
      element: (
        <Auth.Provider value={null}>
          <Private />
        </Auth.Provider>
      ),
    });

    expect(screen.getByText("401"));
  });
});
