import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

const isDev = process.env.NODE_ENV === "development";

dotenv.config({
  path: `${isDev ? ".env.development" : ".env"}`,
  override: true
});

export default defineConfig({
  out: "./migrations",
  schema: "./workers/database/schemas.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
});
