import React, { useEffect, useState } from "react"; 
import { useSocket } from "../context/SocketContext";
import './Chat.css'; // Import the custom CSS

const Chat = () => {
  const socket = useSocket();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Load username and messages from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(storedMessages);
  }, []);

  // Send a new message
  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMsg = {
        content: message,
        sender: username,
        time: new Date().toLocaleTimeString(),
      };

      socket.emit("send_message", newMsg);
      setMessage(""); // Clear input
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data) => {
      setMessages((prev) => {
        const updated = [...prev, data];
        localStorage.setItem("messages", JSON.stringify(updated));
        return updated;
      });
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [socket]);

  return (
    <div className="chat-container">
      <h2>Welcome to the Chat Room</h2>
      <p>Welcome, <strong>{username || "Guest"}</strong>! Start chatting below.</p>

      <div className="messages-box">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender === username ? "sent" : "received"}`}>
            <div className="message-header">
              <strong>{msg.sender}</strong> <span className="timestamp">{msg.time}</span>
            </div>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-control"
        />
        <button onClick={sendMessage} className="btn btn-primary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
