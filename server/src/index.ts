import { filter } from "./utils/filter.js";
import { socket } from "./services/socket.js";
import express, { type Request, type Response } from "express";

const app = express();

app.get("/trades", (req: Request, res: Response): void => {
  res.json(filter(Object.values(socket.trades).flat(), req.query));
});

app.get("/trades/:symbol", (req: Request, res: Response): void => {
  const symbol = String(req.params.symbol).toUpperCase();

  if (socket.trades[symbol]) {
    res.json(filter(socket.trades[symbol], req.query));
  } else {
    res.status(404).json({ message: "Symbol not found" });
  }
});

app.get("/trades/:symbol/stats", (req: Request, res: Response): void => {
  const symbol = String(req.params.symbol).toUpperCase();

  if (socket.trades[symbol]) {
    res.json({ message: "Method under construction." });
  } else {
    res.status(404).json({ message: "Symbol not found" });
  }
});

app.get("/trades/:symbol/candle", (req: Request, res: Response): void => {
  const symbol = String(req.params.symbol).toUpperCase();

  if (socket.trades[symbol]) {
    res.json({ message: "Method under construction." });
  } else {
    res.status(404).json({ message: "Symbol not found" });
  }
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
