import { Express, RequestHandler } from "express";
import promClient from "prom-client";

// type Route = {
// path: string;
// regexp: RegExp;
// }
// type Router = {
// stack: Route[];
// }

export function metrics(app: Express): RequestHandler {
  const extractRoutes = (router) => {
    return router.stack
      .filter((r) => r.route)
      .map((r) => ({ ...r.route, regexp: r.regexp }));
  };

  const findMatchingRoute = (routes, path: string) =>
    routes.find((r) => r.regexp.test(path));

  const counter = new promClient.Counter({
    name: "http_requests",
    help: "Http requests",
    labelNames: ["method", "path", "status_code"],
  });

  return async (req, res, next) => {
    const route = findMatchingRoute(extractRoutes(app._router), req.path);
    next();

    res.on("finish", () => {
      counter.inc({
        path: route ? route.path : "undefined",
        method: req.method,
        status_code: res.statusCode,
      });
    });
  };
}
