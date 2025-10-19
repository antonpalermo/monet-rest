import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { entry } from "../database/schemas/entry";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app
  // get all entries
  .get("/", c => {
    return c.json({
      message: "ok"
    });
  })
  // creates a new entry in the ledger
  .post("/create", async ctx => {
    const sql = neon(ctx.env.DATABASE_URL);
    const db = drizzle(sql);

    const body = await ctx.req.json();

    try {
      const result = await db
        .insert(entry)
        .values({
          description: body.description,
          amount: body.amount
        })
        .returning();

      return ctx.json(
        {
          data: result[0],
          message: "entry successfully created"
        },
        201
      );
    } catch (error) {
      throw new HTTPException(500, {
        message: "internal server error",
        cause: error
      });
    }
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
