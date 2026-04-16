import { io } from "socket.io-client";

export const socket = io("https://chat-app-2-3yas.onrender.com", {
  autoConnect: false,  
});
