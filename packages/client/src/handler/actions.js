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
export async function reaction({ request, params }) {
  const { title, intent } = await getBody(request);

  switch (intent) {
    case "SentimentSatisfied":
    case "ThumbUp":
    case "Bookmark": {
      const data = await localforage.getItem("reactionsByPost");
      /** @type {Set} */
      const reactedUsers = data[title][intent];

      if (reactedUsers.has("owo")) {
        reactedUsers.delete("owo");
      } else {
        reactedUsers.add("owo");
      }

      await localforage.setItem("reactionsByPost", data);

      break;
    }
  }

  return null;
}

export async function auth({ request, params }) {
  switch (request.method) {
    case "POST": {
      const body = await getBody(request);
      try {
        const { data: token } = await api.post("/auth", body);

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

    default:
      break;
  }
}

async function getBody(request) {
  return Object.fromEntries(await request.formData());
}
