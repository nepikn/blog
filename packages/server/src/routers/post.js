import express from "express";
import Post from "../db/models/post";

export const post = express
  .Router()
  .get("", (req, res, next) => {
    res.json(Post.getAll());
  })
  .get("/reactions", (req, res, next) => {
    res.json(Post.getReactions());
  })
  .get("/:category", (req, res, next) => {
    const { category } = req.params;
    const data = Post.getByCategory(category);

    if (data.length) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  });
