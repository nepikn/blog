import { redirect } from "react-router-dom";
import { api } from "./api";

export async function action({ request, params }) {
  // todo

  return redirect(`/`);
}

export async function signIn({ request, params }) {
  // todo
  const token = await api.post("login", request); // todo

  return redirect(`/`);
}
