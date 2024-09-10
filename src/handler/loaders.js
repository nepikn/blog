import { api } from "./api";

export async function loader({ request }) {
  // todo

  return {};
}

export async function getUser({ request }) {
  const token = localStorage.getItem("user");
  if (!token) return null;

  const { data } = await api.get("me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}
