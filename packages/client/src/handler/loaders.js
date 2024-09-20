import localforage from "localforage";
import { api } from "./api";

/** @param {{request: Request}}  */
export async function loader({ request, params }) {
  //

  return {};
}

export const categoryLoader = async (...props) => {
  const data = await Promise.all(
    [getPostsByCategory, getActionsByPost].map((cb) =>
      cb(...props),
    ),
  );

  return data;
};

export async function getActionsByPost({ request, params }) {
  // await localforage.removeItem("actionsByPost");
  let data = await localforage.getItem("actionsByPost");
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
        counts[reaction] = [...Array(count)].map((_, i) => i);
      }
    }

    await localforage.setItem("actionsByPost", data);
  }

  return { data };
}

export async function getPostsByCategory({ params }) {
  return api.get(`/post/${params.category}`);
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
