import { useState } from "react";
import "../App.css";

export default function Join({ setUser }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("General");

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Join Chat</h2>

        <input
          className="input"
          placeholder="Enter your name..."
          onChange={(e) => setName(e.target.value)}
        />

        <select className="input" onChange={(e) => setRoom(e.target.value)}>
          <option>General</option>
          <option>Tech</option>
        </select>

        <button
          className="button"
          onClick={() => setUser({ username: name, room })}
        >
          Join Room 
        </button>
      </div>
    </div>
  );
}