import { useContext } from "react";
import { SessionContext } from "../providers/session";

export function useSession() {
  const context = useContext(SessionContext);

  if (typeof context === "undefined") {
    throw new Error("useSession must be use inside SessionProvider");
  }

  return context;
}
