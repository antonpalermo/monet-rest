import { Hono } from "hono";
import { desc, eq, gt, sql } from "drizzle-orm";

import { entry } from "../database/schemas/entry";

import { AppEnv } from "../server";
import { validate } from "../libs/validation";
import { entrySchema, paramSchema } from "../libs/schemas";

const app = new Hono<AppEnv>();

app.post("/create", validate("json", entrySchema.strict()), async ctx => {
  const db = ctx.get("db");
  // get the request body.
  const body = await ctx.req.json();
  // create the entry based on the body provided.
  const createdEntry = await db
    .insert(entry)
    .values({ ...body })
    .returning();
  // return the newly created entry.
  return ctx.json(
    {
      data: createdEntry[0],
      success: true,
      message: "entry successfully created"
    },
    201
  );
});

app.get("/", async ctx => {
  const db = ctx.get("db");
  // return entries for the past 30 days
  const dateFilter = sql`NOW() - INTERVAL '30days'`;
  // select all entries.
  const entries = await db
    .select()
    .from(entry)
    .where(gt(entry.dateCreated, dateFilter))
    .orderBy(desc(entry.dateCreated));
  // return all selected entries.
  return ctx.json({
    data: entries,
    success: true,
    message: "entries successfully fetched"
  });
});

app.get("/:id", validate("param", paramSchema), async ctx => {
  const db = ctx.get("db");
  // get the id parameter
  const { id } = ctx.req.param();
  // query if the provided id exsist.
  const result = await db.select().from(entry).where(eq(entry.id, id));

  if (!result.length) {
    // return not found if no corresponding entries
    // found.
    return ctx.notFound();
  }

  // return corresponding entry if exist.
  return ctx.json({
    data: result[0],
    success: true,
    message: "entry details successfully fetched"
  });
});

app.patch(
  "/:id",
  validate("param", paramSchema),
  validate("json", entrySchema.partial().strict()),
  async ctx => {
    const db = ctx.get("db");
    // get the id parameter.
    const { id } = ctx.req.param();
    // get the request body.
    const body = await ctx.req.json();
    // update entry using the id provided
    const result = await db
      .update(entry)
      .set({ ...body })
      .where(eq(entry.id, id))
      .returning();

    if (!result.length) {
      // if no result meaning no entry got updated.
      return ctx.notFound();
    }

    // return updated entry
    return ctx.json({
      data: result[0],
      success: true,
      message: "entry successfully updated"
    });
  }
);
