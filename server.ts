import { Hono } from "hono";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { secureHeaders } from "hono/secure-headers";

import ledgerRoutes from "./routes/ledgers.routes";
import entriesRoutes from "./routes/entries.route";

const app = new Hono<{ Bindings: CloudflareBindings }>().basePath("/api");

app.use(logger());
app.use(secureHeaders());

app.route("/ledgers", ledgerRoutes);
app.route("/entries", entriesRoutes);

app.get("/", c => {
  return c.text("Hello Hono!");
});

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
