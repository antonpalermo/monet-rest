import { Hono } from "hono";
import { desc, gt, sql } from "drizzle-orm";

import { AppEnv } from "../server";
import { entry } from "../database/schemas/entry";

const app = new Hono<AppEnv>();

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
