CREATE TABLE "entries" (
	"id" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"ledgerId" text,
	"amount" numeric(100, 2) NOT NULL,
	"dateCreated" timestamp DEFAULT now() NOT NULL,
	"dateUpdated" timestamp NOT NULL,
	CONSTRAINT "entries_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "ledgers" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"dateCreated" timestamp DEFAULT now() NOT NULL,
	"dateUpdated" timestamp NOT NULL,
	CONSTRAINT "ledgers_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE INDEX "entries_id_index" ON "entries" USING btree ("id");--> statement-breakpoint
CREATE INDEX "ledger_id_index" ON "ledgers" USING btree ("id");