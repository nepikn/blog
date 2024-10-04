import crypto from "crypto";
import { appendFileSync, readdirSync } from "fs";

const envPath = readdirSync(".").find((name) =>
  name.startsWith(".env"),
);

if (!envPath) {
  throw new Error("no env");
}

appendFileSync(
  envPath,
  `COOKIE_SECRET=${crypto.randomBytes(32).toString("hex")}\n` +
    `JWT_SECRET=${crypto.randomBytes(256).toString("hex")}\n`,
);
