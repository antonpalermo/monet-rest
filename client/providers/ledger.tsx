import { useMutation } from "@tanstack/react-query";
import { createContext, useState, type ReactNode } from "react";

import { formSchema } from "@components/ledger/create-form";
import type z from "zod";

export type Ledger = z.infer<typeof formSchema>;

type LedgerContextProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  createLedger: (ledger: Ledger) => Promise<void>;
};

export const LedgerContext = createContext<LedgerContextProps | undefined>(
  undefined
);

export function LedgerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const createMutation = useMutation({
    mutationFn: createMutationFn,
    onSuccess: () => {
      setOpen(false);
    }
  });

  async function createMutationFn(ledger: Ledger) {
    const result = await fetch("/api/ledgers/create", {
      method: "POST",
      body: JSON.stringify(ledger),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!result.ok) {
      throw new Error("unable to create ledger details");
    }

    return await result.json();
  }

  async function createLedger(ledger: Ledger) {
    createMutation.mutate(ledger);
  }

  return (
    <LedgerContext.Provider
      value={{ open, onOpenChange: setOpen, createLedger }}
    >
      {children}
    </LedgerContext.Provider>
  );
}
