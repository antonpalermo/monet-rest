import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type RouteContext = {
  isAuthenticated: boolean;
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootLayout
});

function RootLayout() {
  return <Outlet />;
}
