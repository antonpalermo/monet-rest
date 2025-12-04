import { Outlet, createFileRoute } from "@tanstack/react-router";

import { Button } from "@ui/button";
import { LedgerSwitch } from "@components/ledger/switch";

export const Route = createFileRoute("/_mainLayout")({
  component: LayoutComponent
});

function LayoutComponent() {
  return (
    <div>
      <header className="px-5">
        <nav className="w-full inline-flex py-2">
          <LedgerSwitch />
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
