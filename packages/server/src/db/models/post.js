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
    counts[reaction] = [...Array(count).keys()];
  }
}

export default class Post {
  static posts = [
    {
      category: "following",
      author: "Jane Doe",
      title: "Exploring the Future of Quantum Computing",
      abstract:
        "This article delves into the advancements in quantum computing, highlighting the potential impact on cryptography, optimization problems, and machine learning. It also discusses the challenges and future directions in the field.",
    },
    {
      category: "following",
      author: "John Smith",
      title: "The Rise of Functional Programming",
      abstract:
        "An overview of functional programming paradigms, their benefits over traditional imperative programming, and how languages like Haskell and Scala are gaining traction in the industry. The article also covers real-world applications and case studies.",
    },
    {
      category: "trending",
      author: "Alice Johnson",
      title: "Machine Learning in Software Development",
      abstract:
        "This paper explores how machine learning algorithms are being integrated into software development processes to improve code quality, automate testing, and enhance debugging. It includes examples of tools and frameworks currently in use.",
    },
    {
      category: "trending",
      author: "Bob Lee",
      title: "Cybersecurity Threats in Modern Web Development",
      abstract:
        "An in-depth analysis of the latest cybersecurity threats facing web developers, including cross-site scripting (XSS), SQL injection, and man-in-the-middle attacks. The article provides best practices for securing web applications.",
    },
  ];

  static getReactions() {
    return reactions;
  }

  static getByCategory(category) {
    return this.posts.filter((post) => post.category == category);
  }

  static getAll() {
    return this.posts;
  }
}
