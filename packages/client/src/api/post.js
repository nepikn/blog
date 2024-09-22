import axios from "axios";
import localforage from "localforage";
import { defaultConfig, getBody } from ".";

/** @param {{ request: Request}} */
export async function post({ request, params }) {
  const api = axios.create({
    ...defaultConfig,
    baseURL: `${defaultConfig.baseURL}/${post.name}`,
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
      const { title, intent } = await getBody(request);
      const data = await localforage.getItem("reactionsByPost");
      /** @type {Set} */
      const reactedUsers = data[title][intent];

      if (reactedUsers.has("owo")) {
        reactedUsers.delete("owo");
      } else {
        reactedUsers.add("owo");
      }

      return await localforage.setItem("reactionsByPost", data);
    }

    default:
      throw new Error("400");
  }
}

async function getReactionsByPost() {
  // await localforage.removeItem("reactionsByPost");
  let data = await localforage.getItem("reactionsByPost");
  if (!data) {
    data = {
      "Exploring the Future of Quantum Computing": {
        SentimentSatisfied: 117,
        ThumbUp: 312,
        ChatBubble: 226,
        Bookmark: 0,
      },
      "The Rise of Functional Programming": {
        SentimentSatisfied: 189,
        ThumbUp: 136,
        ChatBubble: 48,
        Bookmark: 0,
      },
      "Machine Learning in Software Development": {
        SentimentSatisfied: 267,
        ThumbUp: 355,
        ChatBubble: 207,
        Bookmark: 0,
      },
      "Cybersecurity Threats in Modern Web Development": {
        SentimentSatisfied: 288,
        ThumbUp: 214,
        ChatBubble: 250,
        Bookmark: 0,
      },
    };

    for (const counts of Object.values(data)) {
      for (const [reaction, count] of Object.entries(counts)) {
        counts[reaction] = new Set(
          [...Array(count)].map((_, i) => i),
        );
      }
    }

    await localforage.setItem("reactionsByPost", data);
  }

  return { data };
}
