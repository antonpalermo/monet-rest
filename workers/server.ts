import { Hono } from "hono";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { secureHeaders } from "hono/secure-headers";

import { drizzle, type NeonDatabase } from "drizzle-orm/neon-serverless";

import ledgerRoutes from "./routes/ledgers";
import entriesRoutes from "./routes/entries";
import { auth, type Session } from "./libs/auth";

export type AppEnv = {
  Bindings: CloudflareBindings;
  Variables: {
    db: NeonDatabase;
    user: Session["user"] | null;
    session: Session["session"] | null;
  };
};

const app = new Hono<AppEnv>().basePath("/api");

app.get("/", c => {
  return c.text("Hello Hono!");
});

app.use(logger());
app.use(secureHeaders());

app.use(async (ctx, next) => {
  const session = await auth(ctx.env).api.getSession({
    headers: ctx.req.raw.headers
  });

  if (!session) {
    ctx.set("user", null);
    ctx.set("session", null);
    await next();
    return;
  }

  ctx.set("user", session.user);
  ctx.set("session", session.session);
  await next();
});

app.use(async (ctx, next) => {
  const db = drizzle(ctx.env.DATABASE_URL);
  // set db context.
  ctx.set("db", db);
  // proceed with the next step.
  await next();
});

app.on(["POST", "GET"], "/auth/*", c => auth(c.env).handler(c.req.raw));

app.route("/ledgers", ledgerRoutes);
app.route("/entries", entriesRoutes);

app.onError((err, ctx) => {
  if (err instanceof HTTPException) {
    const response = err.getResponse();

    switch (response.status) {
      case 401:
        return ctx.json(
          { success: false, message: "unauthorized access" },
          401
        );
    }
  }

  // default fallback value
  return ctx.json(
    {
      success: false,
      message: "Internal Server Error"
    },
    500
  );
});

export default app;
