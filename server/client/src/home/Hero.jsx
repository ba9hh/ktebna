import React from "react";
import { BookOpen } from "lucide-react";
const BOOKS = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: 15.99,
    rating: 4.9,
    category: "Habits & Productivity",
    cover: "atomic-habits",
    badge: "Bestseller",
  },
  {
    id: 2,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    price: 14.49,
    rating: 4.8,
    category: "Personal Growth",
    cover: "7-habits",
    badge: "Classic",
  },
  {
    id: 3,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 12.99,
    rating: 4.7,
    category: "Success & Wealth",
    cover: "think-grow-rich",
    badge: "Timeless",
  },
  {
    id: 4,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    price: 13.49,
    rating: 4.6,
    category: "Mindfulness",
    cover: "power-of-now",
    badge: "Spiritual",
  },
  {
    id: 5,
    title: "Can’t Hurt Me",
    author: "David Goggins",
    price: 16.99,
    rating: 4.9,
    category: "Motivation",
    cover: "cant-hurt-me",
    badge: "Inspiring",
  },
  {
    id: 6,
    title: "Deep Work",
    author: "Cal Newport",
    price: 14.99,
    rating: 4.8,
    category: "Focus & Productivity",
    cover: "deep-work",
    badge: "Staff Pick",
  },
];

const Hero = () => {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="overflow-hidden rounded-3xl border border-stone-200/60 bg-[radial-gradient(ellipse_at_top_left,rgba(146,64,14,0.12),transparent_45%),linear-gradient(to_bottom_right,#fff7ed,#fefae7)] p-8 shadow-lg dark:border-stone-800 dark:bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.12),transparent_45%),linear-gradient(to_bottom_right,#0b0a09,#151311)]">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="font-serif text-3xl leading-tight text-stone-900 md:text-5xl dark:text-stone-50">
                Discover your next great read
              </h1>
              <p className="mt-3 max-w-prose text-stone-600 md:text-lg dark:text-stone-400">
                A vibrant book hub where you can buy, sell, or exchange
                favorites and discover new reads.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  className="rounded-2xl bg-amber-700 px-5 py-3 text-sm font-medium text-amber-50 shadow hover:bg-amber-800"
                  href="books"
                >
                  Buy Books
                </a>
                <a
                  className="rounded-2xl border border-stone-300 bg-white/70 px-5 py-3 text-sm font-medium hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  href="account"
                >
                  Sell or Exchange
                </a>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="rounded-2xl border border-amber-900/20 bg-amber-950/5 p-4 shadow-inner">
                <div className="grid grid-cols-3 gap-3">
                  {BOOKS.slice(0, 6).map((b) => (
                    <div
                      key={b.id}
                      className="rounded-xl bg-gradient-to-br from-stone-800 to-stone-900 p-2"
                    >
                      <Cover code={b.cover} title={b.title} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
function Cover({ code, title }) {
  // Elegant placeholder covers with bookish vibes
  const palette = {
    "atomic-habits": "from-amber-600 via-yellow-600 to-stone-900", // energetic, habit-building
    "7-habits": "from-indigo-800 via-purple-800 to-stone-900", // wisdom & growth
    "think-grow-rich": "from-yellow-700 via-amber-800 to-stone-900", // wealth & success
    "power-of-now": "from-teal-700 via-cyan-800 to-stone-900", // mindfulness & calm
    "cant-hurt-me": "from-red-800 via-orange-900 to-stone-900", // toughness, fire, resilience
    "deep-work": "from-blue-900 via-sky-800 to-stone-900", // focus & clarity
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
export default Hero;
