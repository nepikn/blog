import express from "express";
import jwt from "jsonwebtoken";

export const auth = express
  .Router()
  .post(
    "",
    /** @type {express.RequestHandler} */
    (req, res, next) => {
      const { name, password } = req.body;

      if (name != "owo" || password != "owo") {
        throw new Error("401");
      }

      const token = jwt.sign({ name }, process.env.JWT_SECRET);

      res.json(token);
    },
  )
  .get(
    "",
    /** @type {express.RequestHandler} */
    (req, res, next) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
          return res.sendStatus(400);
        }

        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);

        res.json(decoded);
      } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
          res.sendStatus(401);
        } else {
          throw err;
        }
      }
    },
  );
