import { createRouter, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "../routeTree.gen";
import { createAuthClient } from "better-auth/react";

export type Session = ReturnType<typeof useSession>;

const router = createRouter({
  routeTree,
  context: {
    session: undefined
  }
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const { useSession } = createAuthClient();

export function App() {
  const session = useSession();

  return <RouterProvider router={router} context={{ session }} />;
}
