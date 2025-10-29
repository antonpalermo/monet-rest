import { Hono } from "hono";
import { logger } from "hono/logger";
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

export default app;
