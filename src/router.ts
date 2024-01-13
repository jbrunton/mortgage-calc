import {
  Router,
  RootRoute,
  createHashHistory,
  RouterHistory,
} from "@tanstack/react-router";
import { buildAppRoutes } from "./app/app-routes";
import { Layout } from "./layout";

const rootRoute = new RootRoute({
  component: () => Layout(),
});

const routeTree = rootRoute.addChildren(buildAppRoutes(rootRoute));

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
