import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import UpdateProfilePictureModal from "./UpdateProfilePictureModal";
const UserInformations = () => {
  const { handleLogout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");

  const fetchUserInfo = async () => {
    const response = await axios.get("https://ktebna.onrender.com/api/user");
    return response.data;
  };
  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
  });
  useEffect(() => {
    if (userInfo?.name) setNewName(userInfo.name);
  }, [userInfo]);
  const handleSave = async () => {
    try {
      await axios.put("https://ktebna.onrender.com/api/user/name", newName);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    handleLogout();
  };

  return (
    <div className="flex flex-col items-center w-full md:w-fit p-6 gap-3 border rounded-xl shadow-md">
      <div className="relative inline-block group w-16 h-16">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute bottom-0 -right-2 hover:bg-gray-100 bg-white rounded-full p-1 shadow-md transition-opacity focus:outline-none"
        >
          <Pencil size={14} color="#4B5563" />
        </button>
        <img
          src={userInfo?.profilePicture}
          alt="Profile picture"
          className="w-16 h-16 object-cover rounded-full"
        />
      </div>
      {!editMode ? (
        <>
          <div className="flex flex-col items-center">
            <h1>{userInfo?.name}</h1>
            <p>{userInfo?.email}</p>
          </div>
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => setEditMode(!editMode)}
              className="px-3 py-1 text-sm rounded-lg border bg-gray-100 hover:bg-gray-200"
            >
              Edit
            </button>
            <button
              onClick={logout}
              className="px-3 py-1 text-sm rounded-lg border bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={"Name"}
            className="border rounded-xl p-2"
          />
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => setEditMode(!editMode)}
              className="px-3 py-1 text-sm rounded-lg border bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={
                newName == userInfo?.name || newName.trim()?.length === 0
              }
              className={`px-3 py-1 text-sm rounded-lg border text-white ${
                newName === userInfo?.name || newName.trim().length === 0
                  ? "bg-gray-400 "
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Save
            </button>
          </div>
        </>
      )}
      <UpdateProfilePictureModal
        open={open}
        handleClose={() => setOpen(false)}
        userProfilePicture={userInfo?.profilePicture}
      />
    </div>
  );
};

export default UserInformations;
