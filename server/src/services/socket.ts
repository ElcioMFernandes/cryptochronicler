import WebSocket from "ws";
import { createClient, type RedisClientType } from "redis";

import type { Trade } from "../types/trade.js";

class Socket {
  // Private atributes
  private socket: WebSocket | null = null;
  private redis: RedisClientType;

  // Public attributes
  public trades: Record<string, Trade[]> = {};

  constructor() {
    this.redis = createClient({ url: "redis://localhost:6379" });

    this.redis.on("error", (error) => {
      console.error("Redis error:", error);
    });
  }

  // Public methods
  public async connect(): Promise<void> {
    await this.redis.connect();

    await new Promise<void>((resolve, reject) => {
      this.socket = new WebSocket(
        "wss://stream.binance.com:9443/stream?streams=btcusdt@trade/ethusdt@trade/solusdt@trade/xrpusdt@trade/adausdt@trade"
      );

      this.socket.on("open", () => {
        resolve();
      });

      this.socket.on("close", () => {
        console.log(
          "WebSocket disconnected. Attempting to reconnect in 5 seconds..."
        );
        setTimeout(() => this.connect(), 5000);
      });

      this.socket.on("error", (error) => {
        console.error("WebSocket error:", error);
        if (this.socket?.readyState !== WebSocket.OPEN) {
          reject(error);
        }
      });

      this.socket.on("message", (data) => {
        const trade: Trade = JSON.parse(data.toString())["data"];

        if (!this.trades[trade.s]) {
          this.trades[trade.s] = [];
        }

        this.trades[trade.s]!.push(trade);
      });
    });
  }
}

export const socket = new Socket();
