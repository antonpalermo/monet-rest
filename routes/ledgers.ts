import { Hono } from "hono";
import { eq } from "drizzle-orm";

import { ledger } from "../database/schemas/ledger";

import type { AppEnv } from "../workers/server";
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

app.get("/:id", validate("param", paramSchema), async ctx => {
  const db = ctx.get("db");
  const { id } = ctx.req.param();

  const result = await db.select().from(ledger).where(eq(ledger.id, id));

  if (!result.length) {
    return ctx.notFound();
  }

  return ctx.json({
    data: result[0],
    success: true,
    message: "ledger details successfully fetched"
  });
});

app.patch(
  "/:id",
  validate("param", paramSchema),
  validate("json", ledgerSchema.partial().strict()),
  async ctx => {
    const db = ctx.get("db");

    const { id } = ctx.req.param();

    const body = await ctx.req.json();

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
      success: true,
      message: "ledger successfully updated"
    });
  }
);

app.delete("/:id", validate("param", paramSchema), async ctx => {
  const db = ctx.get("db");

  const { id } = ctx.req.param();

  const result = await db.delete(ledger).where(eq(ledger.id, id)).returning();

  if (!result.length) {
    return ctx.notFound();
  }

  return ctx.json({
    data: result[0],
    success: true,
    message: "ledger successfully removed"
  });
});

export default app;
