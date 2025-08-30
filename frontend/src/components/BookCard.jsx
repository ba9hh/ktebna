import React from "react";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
const BookCard = ({
  book,
  onSave,
  isSaved,
  saving,
  onClick,
  handleOpenContactDrawer,
}) => {
  const navigate = useNavigate();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      onClick={onClick}
      className="group relative rounded-2xl border border-stone-200/60 bg-stone-50 shadow-sm transition hover:shadow-lg dark:border-stone-800/60 dark:bg-stone-900 cursor-pointer"
    >
      {book.bookDealType && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-amber-600/95 px-2.5 py-1 text-xs font-medium text-amber-50 shadow">
          {book.bookDealType}
        </div>
      )}

      <div className="relative w-full rounded-xl p-4 shadow-inner">
        <img src={book.bookImage} className="w-full aspect-3/4 object-cover" />
        {book.bookCategory && (
          <div className="absolute right-3 bottom-3 z-10 rounded-full bg-amber-400/95 px-2.5 py-1 text-xs font-medium text-amber-50 shadow">
            {book.bookCategory}
          </div>
        )}
      </div>

      <div className="space-y-1 px-5 pb-5">
        <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 line-clamp-2 truncate">
          {book.bookName}
        </h3>
        <div>
          <p className="text-sm text-black dark:text-stone-400">
            {book.userId?.name}
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {book.bookLocation}
          </p>
        </div>

        <div className="mt-3 space-y-3">
          {/* Book price or offer */}
          <p className="text-base font-semibold text-stone-900 dark:text-stone-100 line-clamp-2 truncate">
            {book.bookPrice}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSave(book._id);
              }}
              disabled={saving}
              className="flex items-center gap-1 rounded-xl border border-stone-300 bg-white/70 px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 active:scale-[0.98] dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
              aria-label="Add to wishlist"
            >
              {isSaved ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Save</span>
            </button>

            <button
              className="flex items-center gap-1 rounded-xl bg-amber-700 px-3 py-2 text-sm font-medium text-amber-50 shadow hover:bg-amber-800 active:scale-[0.98]"
              onClick={(e) => {
                e.stopPropagation();
                // navigate(`/chat/${book.userId?._id}`);
                handleOpenContactDrawer();
              }}
            >
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
