import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: Test,
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: "/signin" });
    }
  }
});

function Test() {
  return <h1>Hello this is the test route</h1>;
}
