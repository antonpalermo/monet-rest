import { index, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { nanoid } from "../../libs/nanoid";

export const entry = pgTable(
  "entries",
  {
    id: text()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid()),
    description: text().notNull(),
    amount: numeric({ mode: "number", precision: 100, scale: 2 }).notNull(),
    dateCreated: timestamp().defaultNow().notNull(),
    dateUpdated: timestamp()
      .$onUpdate(() => new Date())
      .notNull()
  },
  table => [index("entries_id_index").on(table.id)]
);
