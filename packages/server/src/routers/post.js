import express from "express";

export const post = express
  .Router()
  .get("", function getAllPosts(req, res, next) {
    res.json([
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
    ]);
  });
