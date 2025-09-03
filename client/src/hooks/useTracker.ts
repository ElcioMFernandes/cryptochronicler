import { createEffect } from "solid-js";
import { useWebSocket } from "./useWebSocket";
import type { Trade } from "../types/trade";
import { createStore } from "solid-js/store";

export const useTracker = () => {
  const subscriptions = ["btcusdt", "ethusdt", "solusdt", "xrpusdt", "adausdt"];

  const [store, setStore] = createStore<Record<string, Trade | null>>(
    subscriptions.reduce((acc, sub) => ({ ...acc, [sub]: null }), {})
  );

  const wss = useWebSocket(
    `wss://stream.binance.com:9443/stream?streams=${subscriptions
      .map((s) => `${s}@trade`)
      .join("/")}`
  );

  createEffect(() => {
    const message = wss();
    if (message) {
      const { data, stream } = message;
      const symbol = stream.split("@")[0];
      if (subscriptions.includes(symbol)) {
        setStore(symbol, data);
      }
    }
  });

  return { store, subscriptions };
};
