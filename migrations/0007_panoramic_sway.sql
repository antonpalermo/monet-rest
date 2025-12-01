ALTER TABLE "account" DROP CONSTRAINT "account_id_unique";--> statement-breakpoint
ALTER TABLE "ledger" ADD CONSTRAINT "ledger_id_unique" UNIQUE("id");