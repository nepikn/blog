import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import routes from "../../src/routes";
import { setup } from "../setup";

describe("App", () => {
  it("navigates bad landings to the error page", async () => {
    setup({ entry: "/dasnboard", ...routes[0] });

    expect(screen.getByText(/not found/i));
    expect(screen.getByRole("link", { name: /home/i }));
  });
});
