import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app
  .get("/", async ctx => {
    return ctx.json({
      message: "ok"
    });
  })
  .post("/create", async ctx => {
    return ctx.json({
      message: "ok"
    });
  })
  .get("/:id", async ctx => {
    return ctx.json({
      message: "ok"
    });
  })
  .patch("/:id", async ctx => {
    return ctx.json({
      message: "ok"
    });
  })
  .delete("/:id", async ctx => {
    return ctx.json({
      message: "ok"
    });
  });

export default app;
