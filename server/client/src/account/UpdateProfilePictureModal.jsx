import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Stack,
  CircularProgress,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
const UpdateProfilePictureModal = ({
  open,
  handleClose,
  userProfilePicture,
}) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (file) {
        const imgFormData = new FormData();
        imgFormData.append("image", file);
        const uploadRes = await axios.post(
          "http://localhost:3000/upload",
          imgFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const uploadedImageUrl = uploadRes.data.url;
        await axios.put("http://localhost:3000/api/user/profile-picture", {
          newProfilePicture: uploadedImageUrl,
        });
      }
      handleClose();
      setFile(null);
      setPreview(null);
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setFile(f);
    setPreview(url);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Profile Picture</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <div className="flex justify-center">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <img
                src={userProfilePicture}
                alt="profile picture"
                className="w-32 h-32 rounded-full object-cover"
              />
            )}
          </div>
          <Button variant="outlined" component="label" sx={{ px: 12 }}>
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpdate}
          disabled={loading || !file}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProfilePictureModal;
