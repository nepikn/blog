import { redirect } from "react-router-dom";
import { api } from "./api";

export async function action({ request, params }) {
  // todo

  return redirect(`/`);
}

export async function login({ request, params }) {
  const body = Object.fromEntries(await request.formData());
  try {
    const { data: token } = await api.post("/login", body);

    localStorage.setItem("user", token);

    redirect("");

    return null;
  } catch (error) {
    return error;
  }
}
