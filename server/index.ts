import promClient from "prom-client";
import promBundle from "express-prom-bundle";
import express, { Request, Response, NextFunction } from "express";
import async from "express-async-handler";

import { errorCatcher } from "./error-catcher";
import { CoinSide, flip } from "./flipper";
import { delay } from "./delay-middleware";
import { metrics } from "./metrics-middleware";

const metricsMiddleware = promBundle({
  includeMethod: true,
  includeStatusCode: true,
  includePath: true,
  buckets: [0.01, 0.1, 1, 1.5, 2, 2.5, 5],

  // @ts-ignore
  promClient: promClient,
});

const coinFlipCounter = new promClient.Counter({
  name: "coin_flip_totals",
  help: "Coin flip total counter",
  labelNames: ["side"],
});

const app = express();
app.use(metricsMiddleware);
// app.use(delay({ rangeLower: 20, rangeUpper: 2000 }));
app.use(metrics(app));

app.get(
  "/flip",
  async(async (_req: Request, res: Response) => {
    switch (flip()) {
      case CoinSide.SIDE:
        throw new Error("Invalid coin flip: landed on its side");

      case CoinSide.HEAD:
        res.json({ result: "HEAD" });
        coinFlipCounter.inc({ side: "HEAD" });
        break;

      case CoinSide.TAIL:
        res.json({ result: "TAIL" });
        coinFlipCounter.inc({ side: "TAIL" });
        break;
    }
  })
);

app.get("/ping", (_req, res) => {
  res.json({ result: "pong" });
});

app.use(errorCatcher);

const server = app.listen(3000);
console.log("Server listening..");

process.on("SIGTERM", () => {
  console.debug("SIGTERM signal received: closing HTTP server");
  server.close(() => console.debug("HTTP server closed"));
});
