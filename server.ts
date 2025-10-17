import { Hono } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import entriesRoutes from "./routes/entries.route";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(logger());
app.use(secureHeaders());

app.route("/entries", entriesRoutes);
app.get("/", c => {
  return c.text("Hello Hono!");
});

export default app;
