import axios from "axios";
import localforage from "localforage";
import mapObject from "map-obj";
import { defaultConfig, getBody } from ".";

/** @param {{ request: Request}} */
export async function post({ request, params }) {
  const api = axios.create({
    ...defaultConfig,
    baseURL: `${defaultConfig.baseURL}/post`,
  });

  switch (request.method) {
    case "GET": {
      const { data } = await api.get(`/${params.category ?? ""}`);
      const { data: reactionsByPost } =
        await getReactionsByPost();

      return {
        data: data.map((post) =>
          Object.assign(post, {
            reactions: reactionsByPost[post.title],
          }),
        ),
      };
    }

    case "PUT": {
      const { title, username, reaction } =
        await getBody(request);
      const data = await localforage.getItem("reactionsByPost");
      /** @type {Set} */
      const reactedUsers = data[title][reaction];

      if (reactedUsers.has(username)) {
        reactedUsers.delete(username);
      } else {
        reactedUsers.add(username);
      }

      return await localforage.setItem("reactionsByPost", data);
    }

    default:
      throw new Error("400");
  }

  async function getReactionsByPost() {
    // await localforage.removeItem("reactionsByPost");
    let data = await localforage.getItem("reactionsByPost");
    if (data) {
      return { data };
    }

    const res = await api.get("/reactions");

    Object.assign(res, {
      data: mapObject(res.data, (title, reactionsByPost) => [
        title,
        mapObject(reactionsByPost, (reaction, reactedUsers) => [
          reaction,
          new Set(reactedUsers),
        ]),
      ]),
    });

    await localforage.setItem("reactionsByPost", res.data);

    return res;
  }
}
