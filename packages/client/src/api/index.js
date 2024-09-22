export const defaultConfig = {
  baseURL: import.meta.env.VITE_API_BASE,
};

export async function getBody(request) {
  return Object.fromEntries(await request.formData());
}

import { auth } from "./auth";
import { post } from "./post";

const api = { auth, post };

export default api;
