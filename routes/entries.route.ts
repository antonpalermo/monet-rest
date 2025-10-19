import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { neon } from "@neondatabase/serverless";
import { desc, eq, gt, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import { entry } from "../database/schemas/entry";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app
  // get all entries
  .get("/", async ctx => {
    const psql = neon(ctx.env.DATABASE_URL);
    const db = drizzle(psql);

    try {
      const dateFilter = sql`NOW() - INTERVAL '30days'`;
      const result = await db
        .select()
        .from(entry)
        .where(gt(entry.dateCreated, dateFilter))
        .orderBy(desc(entry.dateCreated));

      return ctx.json({
        data: result,
        message: "successfully get all entries"
      });
    } catch (error) {
      throw new HTTPException(500, {
        message: "internal server error",
        cause: error
      });
    }
  })
  // creates a new entry in the ledger
  .post("/create", async ctx => {
    const psql = neon(ctx.env.DATABASE_URL);
    const db = drizzle(psql);

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
  .get("/:id", async ctx => {
    const psql = neon(ctx.env.DATABASE_URL);
    const db = drizzle(psql);

    const id = ctx.req.param("id");

    try {
      const result = await db.select().from(entry).where(eq(entry.id, id));

      if (!result.length) {
        return ctx.notFound();
      }

      return ctx.json({
        data: result,
        message: "successfully get all entries"
      });
    } catch (error) {
      throw new HTTPException(500, {
        message: "internal server error",
        cause: error
      });
    }
  })
  .patch("/:id", c => {
    return c.json({
      message: "ok"
    });
  })
  .delete("/:id", async ctx => {
    const psql = neon(ctx.env.DATABASE_URL);
    const db = drizzle(psql);

    const id = ctx.req.param("id");

    try {
      const result = await db.delete(entry).where(eq(entry.id, id)).returning();

      if (!result.length) {
        return ctx.notFound();
      }

      return ctx.json({
        data: result[0],
        message: `${id} successfully removed`
      });
    } catch (error) {
      throw new HTTPException(500, {
        message: "internal server error",
        cause: error
      });
    }
  });

export default app;
