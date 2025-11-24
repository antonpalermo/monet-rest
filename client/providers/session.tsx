import { createContext, type ReactNode } from "react";
import { createAuthClient } from "better-auth/react";
import { redirect } from "@tanstack/react-router";

const authClient = createAuthClient();

export type AuthData = typeof authClient.$Infer.Session;

export type Session = {
  isAuthenticated: boolean;
  user: AuthData["user"] | undefined;
  isPending: boolean;
  socialSignIn: (provider: "google") => Promise<void>;
  signOut: () => Promise<void>;
};

export const SessionContext = createContext<Session | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const { data, isPending } = authClient.useSession();

  async function socialSignIn(provider: "google") {
    await authClient.signIn.social({
      provider,
      callbackURL: "/"
    });
  }

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          throw redirect({ to: "/signin" });
        }
      }
    });
  }

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated: !!data?.user,
        user: data?.user,
        isPending,
        socialSignIn,
        signOut
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
