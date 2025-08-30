import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const UserSavedPosts = () => {
  const queryClient = useQueryClient();
  const [savingPostId, setSavingPostId] = useState(null);

  const fetchSavedPosts = async () => {
    const response = await axios.get(
      "https://ktebna.onrender.com/api/savedPosts"
    );
    return response.data;
  };
  const {
    data: savedPosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["savedPosts"], // cache key
    queryFn: fetchSavedPosts,
  });
  const toggleSaveMutation = useMutation({
    mutationFn: async (post) => {
      setSavingPostId(post._id);

      if (savedPosts.some((p) => p.postId?._id === post._id)) {
        // unsave
        await axios.delete(
          `https://ktebna.onrender.com/api/unsavePost/${post._id}`
        );
        return savedPosts.filter((p) => p.postId?._id !== post._id);
      } else {
        // save
        const res = await axios.post(
          "https://ktebna.onrender.com/api/savePost",
          {
            postId: post._id,
          }
        );
        return [...savedPosts, res.data]; // assuming API returns saved post
      }
    },
    onSuccess: (newSavedPosts) => {
      queryClient.setQueryData(["savedPosts"], newSavedPosts);
    },
    onSettled: () => {
      setSavingPostId(null);
    },
  });

  const toggleSavePost = (post) => {
    toggleSaveMutation.mutate(post);
  };
  console.log(savingPostId);
  return (
    <div className="border flex flex-col flex-1 rounded-xl shadow-md pt-4 p-6">
      <h2 className="text-xl font-semibold text-center mb-4">
        Your Saved Posts
      </h2>

      {isLoading ? (
        <p className="text-gray-500 italic text-center">
          Loading saved posts...
        </p>
      ) : savedPosts?.length === 0 ? (
        <p className="text-gray-500 italic text-center">
          You don’t have any saved posts yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {savedPosts.map((post) => (
            <div key={post.postId?._id} className="p-2">
              <img
                src={post.postId?.bookImage}
                alt={post.postId?.bookName}
                className="w-32 h-32 object-cover"
              />
              <h3 className="font-medium">{post.postId?.bookName}</h3>
              <p className="text-sm text-gray-600">
                {post.postId?.bookCategory}
              </p>
              <p className="text-sm font-semibold">{post.postId?.bookPrice}</p>
              <button
                onClick={() => toggleSavePost(post.postId)}
                disabled={savingPostId === post.postId?._id}
                className="mt-2 text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 disabled:opacity-50"
              >
                {savingPostId === post.postId?._id
                  ? "Unsaving..."
                  : savedPosts.some((p) => p.postId?._id === post.postId?._id)
                  ? "Unsave"
                  : "Save"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSavedPosts;
