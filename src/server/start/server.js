import crypto from "crypto";
import { appendFileSync } from "fs";

appendFileSync(
  // ".env",
  ".env.production",
  `COOKIE_SECRET=${crypto.randomBytes(32).toString("hex")}\n` +
    `JWT_SECRET=${crypto.randomBytes(256).toString("hex")}\n`
);
