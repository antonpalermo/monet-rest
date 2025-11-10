import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { nanoid } from "../../libs/nanoid";
import { entry } from "./entry";

export const ledger = pgTable(
  "ledgers",
  {
    id: text()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: text().notNull(),
    dateCreated: timestamp().defaultNow().notNull(),
    dateUpdated: timestamp()
      .$onUpdate(() => new Date())
      .notNull()
  },
  table => [index("ledger_id_index").on(table.id)]
);

export const ledgerRelations = relations(ledger, ({ many }) => ({
  entries: many(entry)
}));
