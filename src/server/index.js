import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { readFileSync } from "fs";
import helmet from "helmet";
import https from "https";
import morgan from "morgan";
import routers from "./src/routers";

const { parsed: env } = config({
  path: [".env", ".env.local"],
});
const app = express();
const port = env.PORT ?? 3000;
const secret = env.COOKIE_SECRET;
const isProd = env.NODE_ENV == "production";

app.use(morgan(isProd ? "tiny" : "dev"));
app.use(helmet());
app.use(cookieParser(secret));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret,
//     name: "sessionId",
//     resave: false,
//     saveUninitialized: false,
//     // cookie: { secure: true, httpOnly: true },
//   })
// );

app.use(
  cors({
    origin: (env.ALLOWED_ORIGINS ?? "")
      .split(",")
      .concat(/^http:\/\/localhost(:\d+)?$/),
    credentials: true,
  })
);

for (const key of Object.keys(routers)) {
  app.use(`${env.API_BASE ?? ""}/${key}`, routers[key]);
}

app.use(function handleErr(err, req, res, next) {
  if (Number.parseInt(err.message)) {
    res.sendStatus(err.message);
  } else {
    next(err);
  }
});

const server = isProd
  ? https.createServer(
      {
        // cert: env.CERT,
        // key: env.KEY,
        cert: readFileSync(env.CERT),
        key: readFileSync(env.KEY),
      },
      app
    )
  : app;

server.listen(port, () => {
  console.log(`running on port: ${port}`);
});
