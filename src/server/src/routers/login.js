import express from "express";
import jwt from "jsonwebtoken";

export const login = express.Router().post(
  "",
  /** @type {express.RequestHandler} */
  (req, res, next) => {
    const { name, password } = req.body;

    if (name != "owo" || password != "owo") {
      throw new Error("401");
    }

    const token = jwt.sign({ name }, process.env.JWT_SECRET);

    res.json(token);
  }
);
