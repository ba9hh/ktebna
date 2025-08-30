import React, { useState, useMemo } from "react";
import { Filter, Heart, BookOpen, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BOOKS from "../data/books";
import SORTS from "../data/sorts";
import book1 from "../assets/book.png";
import CATEGORIES from "../data/categories";

const Books = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30]);
  const [sort, setSort] = useState("popular");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});

  const filtered = useMemo(() => {
    let items = BOOKS.filter((b) =>
      `${b.title} ${b.author}`.toLowerCase().includes(query.toLowerCase())
    );
    if (category !== "All")
      items = items.filter((b) => b.category === category);
    items = items.filter((b) => b.rating >= minRating);
    items = items.filter(
      (b) => b.price >= priceRange[0] && b.price <= priceRange[1]
    );

    switch (sort) {
      case "price_asc":
        items = items.slice().sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        items = items.slice().sort((a, b) => b.price - a.price);
        break;
      case "rating_desc":
        items = items.slice().sort((a, b) => b.rating - a.rating);
        break;
      default:
        items = items; // as-is for demo
    }
    return items;
  }, [query, category, minRating, priceRange, sort]);

  function addToCart(book: any) {
    setCart((c) => ({ ...c, [book.id]: (c[book.id] || 0) + 1 }));
  }
  function toggleWish(book: any) {
    setWishlist((w) => ({ ...w, [book.id]: !w[book.id] }));
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20">
      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        {/* Filters sidebar */}
        <aside className="hidden md:block">
          <FilterPanel
            category={category}
            setCategory={setCategory}
            minRating={minRating}
            setMinRating={setMinRating}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sort={sort}
            setSort={setSort}
          />
        </aside>

        {/* Catalog */}
        <section id="catalog">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100">
              Featured Books
            </h2>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-stone-500 md:hidden" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-stone-300 bg-white/80 px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-800"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-dashed border-stone-300 p-8 text-center text-stone-500 dark:border-stone-700"
              >
                No books match your filters.
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
              >
                {filtered.map((b) => (
                  <BookCard
                    key={b.id}
                    book={b}
                    onAdd={addToCart}
                    onWish={toggleWish}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
};
function BookCard({ book, onAdd, onWish }: any) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="group relative rounded-2xl border border-stone-200/60 bg-stone-50 shadow-sm transition hover:shadow-lg dark:border-stone-800/60 dark:bg-stone-900"
    >
      {book.badge && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-amber-600/95 px-2.5 py-1 text-xs font-medium text-amber-50 shadow">
          {book.badge}
        </div>
      )}

      <div className="">
        {/* <Cover code={book.cover} title={book.title} /> */}
        <div className={`relative w-full rounded-xl p-4 shadow-inner`}>
          <img src={book.cover} className="w-full aspect-3/4 object-cover" />
          {book.category && (
            <div className="absolute right-3 bottom-3 z-10 rounded-full bg-amber-400/95 px-2.5 py-1 text-xs font-medium text-amber-50 shadow">
              {book.category}
            </div>
          )}
        </div>
      </div>
      <div className="space-y-1 px-5 pb-5">
        <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 line-clamp-2">
          {book.title}
        </h3>
        <div>
          <p className="text-sm text-black dark:text-stone-400">
            {book.author}
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {book.location}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            {/* {book.price.toFixed(2)} dt */}The art
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onWish(book)}
              className="rounded-xl border border-stone-300 bg-white/70 px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 active:scale-[0.98] dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </button>
            <button
              onClick={() => onAdd(book)}
              className="rounded-xl bg-amber-700 px-3 py-2 text-sm font-medium text-amber-50 shadow hover:bg-amber-800 active:scale-[0.98]"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
function FilterPanel({
  category,
  setCategory,
  minRating,
  setMinRating,
  priceRange,
  setPriceRange,
  sort,
  setSort,
}: any) {
  return (
    <div className="sticky top-20 space-y-6 rounded-2xl border border-stone-200/60 bg-white/70 p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900/70">
      <div>
        <h3 className="mb-2 font-serif text-lg">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-xl px-3 py-1.5 text-sm transition ${
                category === c
                  ? "bg-amber-700 text-amber-50 shadow"
                  : "border border-stone-300 bg-white/70 text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-serif text-lg">Minimum rating</h3>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
            className="w-full"
          />
          <span className="w-10 text-right text-sm">
            {minRating.toFixed(1)}
          </span>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-serif text-lg">Price range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-20 rounded-xl border border-stone-300 bg-white/70 px-2 py-1 text-sm dark:border-stone-700 dark:bg-stone-800"
          />
          <span>—</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-20 rounded-xl border border-stone-300 bg-white/70 px-2 py-1 text-sm dark:border-stone-700 dark:bg-stone-800"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-serif text-lg">Sort by</h3>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-xl border border-stone-300 bg-white/80 px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-800"
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-amber-900/20 bg-amber-50/50 p-3 text-xs text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/10 dark:text-amber-200">
        Tip: combine search + filters to narrow down like a librarian 📚
      </div>
    </div>
  );
}
function Rating({ value }: { value: number }) {
  const stars = Array.from({ length: 5 });
  return (
    <div className="flex items-center" aria-label={`Rating ${value} out of 5`}>
      {stars.map((_, i) => {
        const filled = value >= i + 1 || (i + 1 - value < 1 && value > i);
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              filled ? "fill-amber-500 text-amber-500" : "text-amber-500/30"
            }`}
          />
        );
      })}
      <span className="ml-2 text-xs text-stone-500">{value.toFixed(1)}</span>
    </div>
  );
}
function Cover({ code, title }: { code: string; title: string }) {
  // Elegant placeholder covers with bookish vibes
  const palette: Record<string, string> = {
    gatsby: "from-emerald-900 via-teal-900 to-stone-900",
    mockingbird: "from-amber-900 via-orange-900 to-stone-900",
    "1984": "from-stone-900 via-red-900 to-stone-800",
    pride: "from-rose-900 via-rose-800 to-stone-900",
    hobbit: "from-green-900 via-lime-900 to-stone-900",
    notw: "from-sky-900 via-indigo-900 to-stone-900",
    sapiens: "from-stone-800 via-stone-700 to-stone-900",
    atomic: "from-amber-800 via-amber-700 to-stone-900",
  };
  const colors = palette[code] || "from-stone-800 to-stone-900";
  return (
    <div
      className={`aspect-[3/4] w-full rounded-xl bg-gradient-to-br ${colors} p-4 shadow-inner`}
    >
      <div className="flex h-full flex-col justify-between">
        <BookOpen className="h-6 w-6 text-stone-300/70" />
        <h4 className="font-serif text-stone-100/95 text-lg leading-tight drop-shadow-sm line-clamp-3">
          {title}
        </h4>
      </div>
    </div>
  );
}
export default Books;
