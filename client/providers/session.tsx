import { createContext, type ReactNode } from "react";
import { createAuthClient, type SuccessContext } from "better-auth/react";

const authClient = createAuthClient();

export type AuthData = typeof authClient.$Infer.Session;

export type Session = {
  isAuthenticated: boolean;
  user: AuthData["user"] | undefined;
  isPending: boolean;
  socialSignIn: (provider: "google") => Promise<void>;
  signOut: (
    onSuccess: (successContext: SuccessContext) => Promise<void>
  ) => Promise<void>;
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

  async function signOut(
    onSuccess: (successContext: SuccessContext) => Promise<void>
  ) {
    await authClient.signOut({
      fetchOptions: {
        onSuccess
      }
    });
  }

  if (isPending) {
    return null;
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
