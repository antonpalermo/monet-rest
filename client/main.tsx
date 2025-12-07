import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@client/globals.css";
import "@fontsource-variable/inter";

import { App } from "@components/app";
import { LedgerProvider } from "@providers/ledger";
import { SessionProvider } from "@providers/session";

const client = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <SessionProvider>
        <LedgerProvider>
          <App />
        </LedgerProvider>
      </SessionProvider>
    </QueryClientProvider>
  </StrictMode>
);
