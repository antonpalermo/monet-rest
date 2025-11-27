import { createRouter, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "../routeTree.gen";
import { useSession } from "../hooks/use-session";

const router = createRouter({
  routeTree,
  context: {
    isAuthenticated: false
  }
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const { isAuthenticated } = useSession();

  return <RouterProvider router={router} context={{ isAuthenticated }} />;
}
