import localforage from "localforage";
import { redirect } from "react-router-dom";
import { childRoutes } from "../routes/dashboard/children/index";
import { api } from "./api";

/** @param {{ request: Request}} */
export async function action({ request, params }) {
  //

  return redirect(`/`);
}

/** @param {{ request: Request}} */
export async function auth({ request, params }) {
  const key = "user";

  switch (request.method) {
    case "POST": {
      const body = Object.fromEntries(await request.formData());
      try {
        const { data: token } = await api.post("/login", body);

        await localforage.setItem(key, { token });

        return redirect(`/dashboard/${childRoutes[0].path}`);
      } catch (error) {
        return error;
      }
    }

    case "DELETE": {
      await localforage.clear();

      return redirect("");
    }

    default:
      break;
  }
}
