import { Outlet, createFileRoute } from "@tanstack/react-router";

import { Button } from "@ui/button";
import { LedgerSwitch } from "@components/ledger/switch";
import { CreateLedgerDialog } from "@client/components/ledger/create-dialog";

export const Route = createFileRoute("/_mainLayout")({
  component: LayoutComponent
});

function LayoutComponent() {
  return (
    <div>
      <header className="px-5">
        <nav className="w-full inline-flex py-2">
          <div className="flex items-center space-x-3">
            <LedgerSwitch />
            <CreateLedgerDialog />
          </div>
          <span className="mx-auto"></span>
          <Button>Sign Out</Button>
        </nav>
      </header>
      <hr />
      <main className="px-5">
        <div className="py-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
