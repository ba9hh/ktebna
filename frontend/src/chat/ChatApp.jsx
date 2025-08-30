import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useParams } from "react-router-dom";

const API = "http://localhost:3000/api";

export default function ChatApp() {
  const { user } = useContext(AuthContext);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { otherUserId } = useParams();
  // load users

  useEffect(() => {
    if (conversation) {
      axios
        .get(`${API}/messages/${conversation._id}`)
        .then((res) => setMessages(res.data));
    }
  }, [conversation]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      const res = await axios.post(`${API}/messages`, {
        firstUserId: user?._id,
        secondUserId: otherUserId,
        userId: user?._id,
        messageContent: input,
      });

      if (!conversation) setConversation(res.data.conversation);
      setMessages((prev) => [...prev, res.data.message]);
      setInput("");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to send message");
    }
  };
  useEffect(() => {
    if (user?._id && otherUserId) {
      axios
        .get(`${API}/find/${user?._id}/${otherUserId}`)
        .then((res) => {
          console.log(res);
          if (res.data) {
            setConversation(res.data);
            // fetch messages of that conversation
            return axios.get(`${API}/messages/${res.data._id}`);
          }
        })
        .then((res) => {
          if (res) setMessages(res.data);
        })
        .catch((err) => {
          console.error("Error fetching conversation or messages", err);
        });
    }
  }, [user?._id, otherUserId]);
  console.log(user?._id);
  console.log(conversation);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-4">
        <h1 className="text-xl font-bold text-center mb-4">
          💬 Messenger (
          {conversation?.firstUserId._id === user?._id
            ? conversation?.secondUserId?.name
            : conversation?.firstUserId?.name}{" "}
          )
        </h1>

        {/* Chat window */}
        <div className="h-64 overflow-y-auto border rounded p-2 mb-2">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center">No messages yet</p>
          )}
          {messages.map((m) => (
            <div
              key={m._id}
              className={`p-2 my-1 rounded-lg max-w-[70%] ${
                m.userId._id === user?._id
                  ? "bg-blue-100 ml-auto text-right"
                  : "bg-gray-200 mr-auto"
              }`}
            >
              {console.log(m)}
              <p className="text-sm">{m.messageContent}</p>
              <span className="text-xs text-gray-500">{m.userId.name}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded p-2"
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
