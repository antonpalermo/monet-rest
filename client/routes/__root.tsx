import {
  Link,
  Outlet,
  createRootRouteWithContext
} from "@tanstack/react-router";
import type { Session } from "../components/app";

function RootLayout() {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/test">Test</Link>
        <Link to="/signin">Sign In</Link>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}

type RouteContext = {
  session: Session | undefined;
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootLayout
});
