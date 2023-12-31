import { z } from "zod";
import App from "./App";
import {
  Router,
  RootRoute,
  Route,
  createHashHistory,
  Outlet,
  RouterHistory,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const rootRoute = new RootRoute({
  component: () => (
    <>
      <Outlet />
      {import.meta.env.MODE === "development" ? (
        <TanStackRouterDevtools />
      ) : null}
    </>
  ),
});

export const IndexTabEnum = z.enum(["mortgage", "rent"]);

const indexSearchSchema = z.object({
  tab: IndexTabEnum.catch(IndexTabEnum.enum.mortgage),
  mortgageLoan: z.number().catch(400_000),
  mortgageRate: z.number().catch(4.5),
  mortgageTerm: z.number().catch(25),
  rent: z.number().catch(2_000),
  rentIncrease: z.number().catch(2),
  rentTerm: z.number().catch(25),
});

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <App />,
  validateSearch: indexSearchSchema,
});

export type IndexSearch = z.infer<typeof indexSearchSchema>;

const routeTree = rootRoute.addChildren([indexRoute]);

export const buildRouter = (history: RouterHistory) =>
  new Router({
    routeTree,
    history,
  });

export const router = buildRouter(createHashHistory());

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
