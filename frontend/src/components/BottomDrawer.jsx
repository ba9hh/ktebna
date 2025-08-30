import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { X } from "lucide-react";

const BottomDrawer = ({ open, onClose, book }) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        className: "rounded-t-2xl p-6 bg-white dark:bg-stone-900",
      }}
    >
      {book && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-serif font-semibold">
              {book.bookName}
            </h2>
            <IconButton onClick={onClose}>
              <X className="h-5 w-5" />
            </IconButton>
          </div>

          <div className="grid gap-4 md:grid-cols-[200px_1fr]">
            <img
              src={book.bookImage}
              alt={book.bookName}
              className="w-full rounded-xl object-cover"
            />
            <div>
              <p className="text-stone-600 dark:text-stone-300 mb-2">
                {book.bookDescription}
              </p>
              <p className="font-medium">
                Price: <span className="text-amber-700">{book.bookPrice}</span>
              </p>
              <p className="text-sm text-stone-500">
                Location: {book.bookLocation}
              </p>
              <p className="text-sm text-stone-500">
                Seller: {book.userId?.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default BottomDrawer;
