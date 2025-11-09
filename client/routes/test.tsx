import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: Test
});

function Test() {
  return <h1>Hello this is the test route</h1>;
}
