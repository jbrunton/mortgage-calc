import { RootRoute, Route } from "@tanstack/react-router";
import { App } from "./app";
import { appSearchSchema } from "./app-search-params";

export const buildAppRoutes = (root: RootRoute) => [
  new Route({
    getParentRoute: () => root,
    path: "/",
    component: () => <App />,
    validateSearch: appSearchSchema,
  }),
];
