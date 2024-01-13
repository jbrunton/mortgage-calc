import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const Devtools = () => {
  return import.meta.env.MODE === "development" ? (
    <TanStackRouterDevtools />
  ) : null;
};

export const Layout = () => (
  <>
    <Outlet />
    <Devtools />
  </>
);
