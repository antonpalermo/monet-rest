import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";

import { ledger } from "../database/schemas/ledger";

import { AppEnv } from "../server";
import { validate } from "../libs/validation";
import { paramSchema, ledgerSchema } from "../libs/schemas";

const app = new Hono<AppEnv>();

app.post("/create", validate("json", ledgerSchema.strict()), async ctx => {
  const db = ctx.get("db");

  const body = await ctx.req.json();

  const createdLedger = await db
    .insert(ledger)
    .values({ name: body.name })
    .returning();

  return ctx.json(
    {
      data: createdLedger[0],
      success: true,
      message: "ledger successfully created"
    },
    201
  );
});

app.get("/", async ctx => {
  const db = ctx.get("db");

  // TODO: only return ledgers that are belong to a user and
  //       selected ledger
  const ledgers = await db.select().from(ledger);

  return ctx.json({
    data: ledgers,
    success: true,
    message: "ledgers successfully fetched"
  });
});

app
  .get("/:id", validate("param", paramSchema), async ctx => {
    const psql = neon(ctx.env.DATABASE_URL);
    const db = drizzle(psql);

    const { id } = ctx.req.param();

    try {
      const result = await db.select().from(ledger).where(eq(ledger.id, id));

      if (!result.length) {
        return ctx.notFound();
      }

      return ctx.json({
        data: result[0],
        message: "successfully get all ledger details"
      });
    } catch (error) {
      throw new HTTPException(500, {
        message: "internal server error",
        cause: error
      });
    }
  })
  .patch(
    "/:id",
    validate("param", paramSchema),
    validate("json", ledgerSchema.partial().strict()),
    async ctx => {
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
    }
  )
  .delete("/:id", validate("param", paramSchema), async ctx => {
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
