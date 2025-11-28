import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@client/globals.css";
import "@fontsource-variable/inter";

import { App } from "@components/app";
import { SessionProvider } from "@providers/session";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </StrictMode>
);
