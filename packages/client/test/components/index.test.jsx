import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import api from "../../src/api";
import { SignIn } from "../../src/components";
import { Component } from "../../src/routes/dashboard";
import { setup } from "../setup";

describe("SignIn", () => {
  it("lets guests open dialog", async () => {
    await setup(<SignIn />, async (user) => {
      await user.click(await screen.findByRole("button"));
    });

    expect(screen.getAllByRole("presentation"));
  });

  it("shows the hint for wrong passwords", async () => {
    await signIn("omo");

    expect(await screen.findByText(/wrong/i));
  });

  it("redirects for right passwords", async () => {
    await signIn("owo");

    expect(await screen.findByText(/Recommended Title/i));
  });
});

function signIn(pswd) {
  return setup(
    [
      {
        path: "/",
        element: <SignIn open={true} />,
        action: api.auth,
      },
      { path: "/dashboard", element: <Component /> },
    ],
    async (user) => {
      await user.type(screen.getByLabelText(/password/i), pswd);
      await user.click(
        screen.getByRole("button", { name: /sign in/i }),
      );
    },
  );
}
