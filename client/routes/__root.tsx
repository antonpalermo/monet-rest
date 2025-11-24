import {
  Link,
  Outlet,
  createRootRouteWithContext
} from "@tanstack/react-router";
import { useSession } from "../hooks/use-session";

function RootLayout() {
  const { signOut } = useSession();

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/test">Test</Link>
        <Link to="/signin">Sign In</Link>
        <button onClick={async () => signOut()}>Sign Out</button>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}

type RouteContext = {
  isAuthenticated: boolean;
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootLayout
});
