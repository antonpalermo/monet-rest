import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

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

export const Route = createRootRoute({ component: RootLayout });
