import { toast } from "sonner";
import { createContext, useState, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type z from "zod";

import { ledgerSchema } from "@workers/libs/schemas";

export type Ledger = z.infer<typeof ledgerSchema>;

export type LedgerResponse = Ledger & {
  id: string;
};

type LedgerContextProps = {
  ledgers: LedgerResponse[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  createLedger: (ledger: Ledger) => Promise<void>;
};

export const LedgerContext = createContext<LedgerContextProps | undefined>(
  undefined
);

export function LedgerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: result,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ["ledgers"],
    queryFn: getAllLedgersFn
  });

  const createMutation = useMutation({
    mutationFn: createMutationFn,
    onSuccess: data => {
      setOpen(false);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["ledgers"] });
    }
  });

  async function getAllLedgersFn() {
    const result = await fetch("/api/ledgers");

    if (!result.ok) {
      throw new Error("unable to get all ledgers");
    }

    return await result.json();
  }

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

  if (isPending) {
    return null;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <LedgerContext.Provider
      value={{
        ledgers: result.data,
        open,
        onOpenChange: setOpen,
        createLedger
      }}
    >
      {children}
    </LedgerContext.Provider>
  );
}
