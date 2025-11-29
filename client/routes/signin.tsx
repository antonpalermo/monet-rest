import { createAuthClient } from "better-auth/react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@ui/button";

export const Route = createFileRoute("/signin")({
  component: RouteComponent
});

function RouteComponent() {
  const client = createAuthClient();

  async function socialSignIn({
    provider
  }: {
    provider: "google" | "facebook";
  }) {
    await client.signIn.social({
      provider
    });
  }

  return (
    <div>
      <Button onClick={() => socialSignIn({ provider: "google" })}>
        Sign In with Google
      </Button>
    </div>
  );
}
