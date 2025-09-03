import express, { type Request, type Response } from "express";
import { socket } from "./services/socket.js";

const app = express();

app.get("/", (req: Request, res: Response) => {});

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
