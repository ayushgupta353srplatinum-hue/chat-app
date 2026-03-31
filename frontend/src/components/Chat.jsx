import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import "../App.css";
export default function Chat({ user }) {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");

  const hasJoined = useRef(false);

  useEffect(() => {
    if (hasJoined.current) return;
    hasJoined.current = true;

    socket.connect();
    socket.emit("joinRoom", user);

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("typing", (name) => {
      setTyping(name);
      setTimeout(() => setTyping(""), 2000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (msg.trim()) {
      socket.emit("sendMessage", msg);
      setMsg("");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">{user.room} Room</h2>

        <div className="chat-box">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.user === user.username
                  ? "message my-message"
                  : "message"
              }
            >
              <b>{m.user}:</b> {m.text}
            </div>
          ))}
        </div>

        {typing && <p className="typing">{typing} is typing...</p>}

        <input
          className="input"
          placeholder="Type your message..."
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
            socket.emit("typing");
          }}
        />

        <button className="button" onClick={sendMessage}>
          Send 
        </button>
      </div>
    </div>
  );
}