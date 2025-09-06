import express, { type Request, type Response } from "express";

import { filter } from "./utils/filter.js";
import { socket } from "./services/socket.js";

import type { Trade } from "./types/trade.js";

const app = express();

app.get("/trades", async (req: Request, res: Response): Promise<void> => {
  try {
    const all: Trade[] = [];
    for (const key of await socket.redis.keys("*")) {
      const result = await socket.redis.lRange(key, 0, -1);

      const trades = result.map((trade) => JSON.parse(trade));

      all.push(...trades);
    }

    const sorted = all.sort((a, b) => b.T - a.T);

    const filtered = filter(sorted, req.query);

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: "failure to recover trades" });
  }
});

app.get(
  "/trades/:symbol",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const symbol = String(req.params.symbol).toUpperCase();
      const result = await socket.redis.lRange(symbol, 0, -1);

      if (result.length === 0) {
        res.status(404).json({ message: "Symbol not found" });
        return;
      }

      const trades: Trade[] = result.map((trade) => JSON.parse(trade));
      const sorted = trades.sort((a, b) => b.T - a.T);
      const filtered = filter(sorted, req.query);

      res.json(filtered);
    } catch (error) {
      res.status(500).json({ error: "failure to recover trades for symbol" });
    }
  }
);

app.get(
  "/trades/:symbol/stats",
  async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "Method under construction." });
  }
);

app.get("/trades/:symbol/candle", (req: Request, res: Response): void => {
  res.status(501).json({ message: "Method not implemented" });
});

const start = async () => {
  try {
    await socket.connect();

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error(
      "Failed to connect to WebSocket. Server will not start.",
      error
    );
    process.exit(1);
  }
};

start();
