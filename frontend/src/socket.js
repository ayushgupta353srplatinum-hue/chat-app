import { io } from "socket.io-client";

export const socket = io("https://chat-app-eez0.onrender.com", {
  autoConnect: false,   // 🔥 important
});
