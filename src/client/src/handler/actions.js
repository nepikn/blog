import { redirect } from "react-router-dom";
import { api } from "./api";

/** @param {{ request: Request}} */
export async function action({ request, params }) {
  //

  return redirect(`/`);
}

/** @param {{ request: Request}} */
export async function auth({ request, params }) {
  switch (request.method) {
    case "DELETE": {
      localStorage.clear();
      redirect("");

      return null;
    }
    case "POST": {
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

    default:
      break;
  }
}
