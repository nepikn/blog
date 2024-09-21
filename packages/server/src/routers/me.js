import express from "express";
import jwt from "jsonwebtoken";

export const me = express.Router().get(
  "",
  /** @type {express.RequestHandler} */
  (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.sendStatus(400);
      }

      const secret = process.env.JWT_SECRET;
      console.log("secret :>> ", secret);
      console.log("token :>> ", token);
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
