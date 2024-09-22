import axios from "axios";
import localforage from "localforage";
import { redirect } from "react-router-dom";
import { defaultConfig, getBody } from ".";
import { childRoutes } from "../routes/dashboard/children";

export async function auth({ request, params }) {
  const api = axios.create({
    ...defaultConfig,
    baseURL: `${defaultConfig.baseURL}/${auth.name}`,
  });

  switch (request.method) {
    case "POST": {
      const body = await getBody(request);
      try {
        const { data: token } = await api.post("", body);

        await localforage.setItem(auth.name, token);

        return redirect(`/dashboard/${childRoutes[0].path}`);
      } catch (error) {
        return error;
      }
    }

    case "DELETE": {
      await localforage.clear();

      return redirect("");
    }

    case "GET": {
      const token = await localforage.getItem(auth.name);
      if (!token) {
        return { data: null };
      }

      return api.get("", {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    default:
      throw new Error("400");
  }
}
