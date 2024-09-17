import { redirect } from "react-router-dom";
import { childRoutes } from "../routes/dashboard/index";
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

      return redirect("");
    }

    case "POST": {
      const body = Object.fromEntries(await request.formData());
      try {
        const { data: token } = await api.post("/login", body);

        localStorage.setItem("user", token);

        return redirect(`/dashboard/${childRoutes[0].path}`);
      } catch (error) {
        return error;
      }
    }

    default:
      break;
  }
}
