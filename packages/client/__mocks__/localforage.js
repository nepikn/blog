const reactions = {
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

for (const counts of Object.values(reactions)) {
  for (const [reaction, count] of Object.entries(counts)) {
    counts[reaction] = new Set(Array(count).keys());
  }
}

/** @type {LocalForage} */
export default {
  getItem(key) {
    switch (key) {
      case "reactionsByPost": {
        return reactions;
      }
      case "auth": {
        return this._cleared ? null : { name: "owo" };
      }
      default:
        throw new Error("unhandled case");
    }
  },
  setItem() {
    return null;
  },
  clear() {
    this._cleared = true;

    return null;
  },
  _cleared: false,
};
