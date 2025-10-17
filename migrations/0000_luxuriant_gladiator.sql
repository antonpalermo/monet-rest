CREATE TABLE "entries" (
	"id" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"amount" numeric(100, 2) NOT NULL,
	"dateCreated" timestamp DEFAULT now() NOT NULL,
	"dateUpdated" timestamp NOT NULL,
	CONSTRAINT "entries_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE INDEX "entries_id_index" ON "entries" USING btree ("id");