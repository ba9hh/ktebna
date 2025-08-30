import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Typography,
  FormHelperText,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import cities from "../data/cities";
import CATEGORIES from "../data/categories";

const AddPostModal = ({ open, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      bookDeal: "",
      price: "",
      location: "",
      image: null,
    },
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", file);
    let uploadedImageUrl = "";
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      uploadedImageUrl = response.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      return null;
    }
    const payload = {
      bookName: data.name,
      bookCategory: data.category,
      bookPrice: data.bookDeal,
      bookDealType: data.type,
      bookImage: uploadedImageUrl,
      bookLocation: data.location,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/post",
        payload
      );
      toast.success("Product added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>Add Product</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Controller
            name="image"
            control={control}
            rules={{ required: "Image is required" }}
            render={({ field }) => (
              <div style={{ marginBottom: 20 }}>
                <Button variant="contained" component="label">
                  Upload Book Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFile(file);
                      field.onChange(file);
                      setImagePreview(file ? URL.createObjectURL(file) : null);
                    }}
                  />
                </Button>
                {errors.image && (
                  <Typography color="error">{errors.image.message}</Typography>
                )}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      display: "block",
                      marginTop: 10,
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                )}
              </div>
            )}
          />
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                label="Book Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.category}>
                <InputLabel>Book Category</InputLabel>
                <Select {...field} label="Book Category">
                  {CATEGORIES.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.category?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <div className="flex gap-2">
            <Controller
              name="type"
              control={control}
              rules={{ required: "Type of transaction is required" }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" error={!!errors.type}>
                  <InputLabel>Deal Type</InputLabel>
                  <Select {...field} label="Deal Type">
                    {["sell", "exchange"].map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.type?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              name="bookDeal"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <TextField
                  label="Price or Exchange"
                  placeholder="Ex: 30 DT or 'Exchange with Atomic Habits'"
                  type="text"
                  fullWidth
                  margin="normal"
                  error={!!errors.bookDeal}
                  helperText={errors.bookDeal?.message}
                  {...field}
                />
              )}
            />
          </div>
          <Controller
            name="location"
            control={control}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.location}>
                <InputLabel>Book Location</InputLabel>
                <Select {...field} label="Book Location">
                  {cities.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.location?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid || loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPostModal;
