import { Hono } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

import ledgerRoutes from "./routes/ledgers.routes";
import entriesRoutes from "./routes/entries.route";
import { neon } from "@neondatabase/serverless";

export type AppEnv = {
  Bindings: CloudflareBindings;
  Variables: {
    db: NeonHttpDatabase;
  };
};

const app = new Hono<AppEnv>().basePath("/api");

app.use(logger());
app.use(secureHeaders());

app.use(async (ctx, next) => {
  const neonClient = neon(ctx.env.DATABASE_URL);
  const db = drizzle(neonClient);
  // set db context.
  ctx.set("db", db);
  // proceed with the next step.
  await next();
});

app.route("/ledgers", ledgerRoutes);
app.route("/entries", entriesRoutes);

app.get("/", c => {
  return c.text("Hello Hono!");
});

export default app;
