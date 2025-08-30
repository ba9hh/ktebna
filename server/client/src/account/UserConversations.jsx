import { useState, useContext } from "react";
import { AuthContext } from "../AuthProvider.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ChatDrawer from "../chat/ChatDrawer.jsx";

const UserConversations = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fetchConversations = async () => {
    const res = await axios.get(
      "https://ktebna.onrender.com/api/conversations"
    );
    return res.data;
  };
  const {
    data: conversations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  // if (isLoading) {
  //   return (
  //     <div className="border flex flex-col flex-1 rounded-xl shadow-md pt-4 p-6">
  //       <p className="text-center text-gray-500">Loading conversations...</p>
  //     </div>
  //   );
  // }
  return (
    <div className="border flex flex-col flex-1 rounded-xl shadow-md pt-4 p-6">
      <h2 className="text-xl font-semibold text-center mb-4">
        Your Conversations
      </h2>
      {isLoading ? (
        <p className="text-gray-500 italic text-center">Loading posts...</p>
      ) : conversations.length === 0 ? (
        <p className="text-gray-500 italic text-center">
          You don’t have any conversations yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {conversations.map((conv) => {
            // Pick the other user in the conversation
            const otherUser =
              conv.firstUserId._id === user._id
                ? conv.secondUserId
                : conv.firstUserId;

            return (
              <div
                key={conv._id}
                onClick={() => {
                  // navigate(`/chat/${otherUser._id}}`)
                  setSelectedSeller(otherUser._id);
                  setSelectedName(otherUser.name);
                  setOpen(true);
                }}
                className="flex items-center justify-between p-4 bg-white rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={
                      otherUser.profilePicture ||
                      "https://via.placeholder.com/40"
                    }
                    alt={otherUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium truncate max-w-40">
                      {otherUser.name} ({conv.conversationTopic})
                    </p>
                    {/* <p className="text-sm text-gray-500">{otherUser.email}</p> */}
                    <p className="text-sm text-gray-500 truncate max-w-40">
                      {conv.lastMessageSender === user._id
                        ? "You: "
                        : `${otherUser.name}: `}
                      {conv.lastMessageContent}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(conv.updatedAt).toLocaleDateString()}
                </span>
              </div>
            );
          })}
        </div>
      )}
      <ChatDrawer
        open={open}
        onClose={() => {
          setSelectedSeller(null);
          setOpen(false);
        }}
        otherUserId={selectedSeller}
        otherUserName={selectedName}
      />
    </div>
  );
};

export default UserConversations;
