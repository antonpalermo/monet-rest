import { z } from "zod";

export const paramSchema = z.object({ id: z.string().regex(/^[0-9A-Z]{25}$/) });

export const entrySchema = z.object({
  ledgerId: z.string().regex(/^[0-9A-Z]{25}$/),
  description: z.string().min(3).max(250),
  amount: z.number().positive()
});

export const ledgerSchema = z.object({
  name: z
    .string()
    .min(5, "Ledger name must be at least 5 characters long")
    .max(50, "Ledger name must be at most 50 characters long")
});
