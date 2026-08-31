import { createRouter } from "@tanstack/react-router";
import { RoutePending } from "@/components/site-shell";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultPendingComponent: RoutePending,
    defaultPreload: "intent",
    scrollRestoration: true,
  });
}
