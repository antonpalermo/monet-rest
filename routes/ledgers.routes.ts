import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Hono } from "hono";
import { ledger } from "../database/schemas/ledger";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app
  .get("/", async ctx => {
    const psql = neon(ctx.env.DATABASE_URL);
    const db = drizzle(psql);

    try {
      // TODO: only return ledgers that are belong to a user.
      const result = await db.select().from(ledger);
      return ctx.json({
        data: result,
        message: "successfully get all legers"
      });
    } catch (error) {
      throw new HTTPException(500, {
        message: "internal server error",
        cause: error
      });
    }
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
    const psql = neon(ctx.env.DATABASE_URL);
    const db = drizzle(psql);

    const { id } = ctx.req.param();

    try {
      const result = await db.select().from(ledger).where(eq(ledger.id, id));

      return ctx.json({
        data: result[0],
        message: "ledger successfully created"
      });
    } catch (error) {
      throw new HTTPException(500, {
        message: "internal server error",
        cause: error
      });
    }
  })
  .patch("/:id", async ctx => {
    const psql = neon(ctx.env.DATABASE_URL);
    const db = drizzle(psql);

    const { id } = ctx.req.param();

    const body = await ctx.req.json();

    try {
      const result = await db
        .update(ledger)
        .set({ ...body })
        .where(eq(ledger.id, id))
        .returning();

      if (!result.length) {
        return ctx.notFound();
      }

      return ctx.json({
        data: result[0],
        message: "successfully updated"
      });
    } catch (error) {
      throw new HTTPException(500, {
        message: "internal server error",
        cause: error
      });
    }
  })
  .delete("/:id", async ctx => {
    const psql = neon(ctx.env.DATABASE_URL);
    const db = drizzle(psql);

    const { id } = ctx.req.param();

    try {
      const result = await db
        .delete(ledger)
        .where(eq(ledger.id, id))
        .returning();

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
