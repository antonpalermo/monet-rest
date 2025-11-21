import { createFileRoute } from "@tanstack/react-router";
import { createAuthClient } from "better-auth/react";

const { useSession } = createAuthClient();

export const Route = createFileRoute("/")({
  component: App
});

function App() {
  const session = useSession();

  if (session.isPending) {
    return null;
  }

  return <h1>Hello {session.data?.user.name}</h1>;
}
