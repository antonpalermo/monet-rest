import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@ui/dialog";
import { Button } from "@ui/button";

import { CreateLedgerForm } from "@components/ledger/create-form";
import { useLedger } from "@client/hooks/use-ledger";

export function CreateLedgerDialog() {
  const { open, onOpenChange } = useLedger();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New ledger</DialogTitle>
          <DialogDescription>Creates a new ledger</DialogDescription>
        </DialogHeader>
        <CreateLedgerForm />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="ledger-create-form">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
