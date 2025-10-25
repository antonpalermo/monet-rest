import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Hono } from "hono";
import { ledger } from "../database/schemas/ledger";
import { HTTPException } from "hono/http-exception";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app
  .get("/", async ctx => {
    return ctx.json({
      message: "ok"
    });
  })
  .post("/create", async ctx => {
    const psql = neon(ctx.env.DATABASE_URL);
    const db = drizzle(psql);

    const body = await ctx.req.json();

    try {
      const result = await db
        .insert(ledger)
        .values({ name: body.name })
        .returning();

      return ctx.json(
        {
          data: result[0],
          message: "ledger successfully created"
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
