import { Hono } from "hono";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { secureHeaders } from "hono/secure-headers";

import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

import ledgerRoutes from "../routes/ledgers";
import entriesRoutes from "../routes/entries";

export type AppEnv = {
  Bindings: CloudflareBindings;
  Variables: {
    db: NeonHttpDatabase;
  };
};

const app = new Hono<AppEnv>().basePath("/api");

app.get("/", c => {
  return c.text("Hello Hono!");
});

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

app.onError((err, ctx) => {
  console.error(err);
  if (err instanceof HTTPException) {
    err.getResponse();
  }

  return ctx.json(
    {
      success: false,
      message: "Internal Server Error"
    },
    500
  );
});

export default app;
