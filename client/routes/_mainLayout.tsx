import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@ui/button";
import { LedgerSwitch } from "@components/ledger/switch";
import { CreateLedgerDialog } from "@client/components/ledger/create-dialog";

import { useSession } from "@hooks/use-session";

export const Route = createFileRoute("/_mainLayout")({
  component: LayoutComponent
});

function LayoutComponent() {
  const { signOut } = useSession();
  const navigate = useNavigate();

  return (
    <div>
      <header className="px-5">
        <nav className="w-full inline-flex py-2">
          <div className="flex items-center space-x-3">
            <LedgerSwitch />
            <CreateLedgerDialog />
          </div>
          <span className="mx-auto"></span>
          <Button
            onClick={() =>
              signOut(async () => {
                navigate({
                  to: "/signin"
                });
              })
            }
          >
            Sign Out
          </Button>
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
