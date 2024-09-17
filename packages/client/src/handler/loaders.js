import { json } from "react-router-dom";
import { api } from "./api";

/** @param {{request: Request}}  */
export async function loader({ request }) {
  //

  return {};
}

export async function getAllPosts({ request }) {
  return api.get("/post");
}

export async function getUser({ request }) {
  const token = localStorage.getItem("user");
  if (!token) return json({ data: null });

  return api.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
