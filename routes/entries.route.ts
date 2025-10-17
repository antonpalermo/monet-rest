import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app
  // get all entries
  .get("/", c => {
    return c.json({
      message: "ok"
    });
  })
  // creates a new entry in the ledger
  .post("/", c => {
    return c.json(
      {
        message: "ok"
      },
      201
    );
  })
  .get("/:id", c => {
    return c.json({
      message: "ok"
    });
  })
  .patch("/:id", c => {
    return c.json({
      message: "ok"
    });
  })
  .delete("/:id", c => {
    return c.json({
      message: "ok"
    });
  });

export default app;
