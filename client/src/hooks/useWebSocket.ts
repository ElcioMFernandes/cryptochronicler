import { createSignal, onCleanup } from "solid-js";

export const useWebSocket = (url: string) => {
  const [message, setMessage] = createSignal<any | null>(null);
  const socket = new WebSocket(url);

  socket.onopen = () => {
    console.info("WebSocket connected to:", url);
  };

  socket.onmessage = (event) => {
    setMessage(JSON.parse(event.data));
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.info("WebSocket disconnected from:", url);
  };

  onCleanup(() => {
    socket.close();
  });

  return message;
};
