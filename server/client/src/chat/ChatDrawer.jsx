import React, { useState, useContext } from "react";
import axios from "axios";
import { Drawer, IconButton } from "@mui/material";
import { AuthContext } from "../AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";

const API = "https://ktebna.onrender.com/api";

export default function ChatDrawer({
  open,
  onClose,
  otherUserId,
  otherUserName,
  bookName,
}) {
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();

  const { data: conversation } = useQuery({
    queryKey: ["conversation", user?._id, otherUserId],
    queryFn: async () => {
      const res = await axios.get(`${API}/find/${user?._id}/${otherUserId}`);
      return res.data;
    },
    enabled: !!user?._id && !!otherUserId,
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["messages", conversation?._id],
    queryFn: async () => {
      const res = await axios.get(`${API}/messages/${conversation._id}`);
      return res.data;
    },
    enabled: !!conversation?._id,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${API}/messages`, {
        firstUserId: user?._id,
        secondUserId: otherUserId,
        userId: user?._id,
        messageContent: input,
        conversationTopic: bookName,
        lastMessageContent: input,
        lastMessageSender: user?._id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (!conversation) {
        queryClient.invalidateQueries(["conversation", user?._id, otherUserId]);
      }
      queryClient.invalidateQueries(["messages", data.conversation._id]);
      queryClient.setQueryData(
        ["messages", data.conversation._id],
        (old = []) => [...old, data.message]
      );
      setInput("");
    },
    onError: (err) => {
      alert(err.response?.data?.error || "Failed to send message");
    },
  });

  const handleSend = () => {
    if (input.trim()) sendMessageMutation.mutate();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="w-[400px] h-screen flex flex-col bg-gray-100">
        <div className="flex items-center justify-between p-4 border-b bg-white shadow">
          <h1 className="text-lg font-bold truncate">
            💬
            {otherUserName || "Chat"} (
            {bookName || conversation?.conversationTopic})
          </h1>
          <IconButton onClick={onClose}>
            <X size={14} />
          </IconButton>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
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
              <p className="text-sm">{m.messageContent}</p>
              <span className="text-xs text-gray-500">{m.userId.name}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 p-4 border-t bg-white">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded p-2"
          />
          <button
            onClick={handleSend}
            disabled={sendMessageMutation.isLoading}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Send
          </button>
        </div>
      </div>
    </Drawer>
  );
}
