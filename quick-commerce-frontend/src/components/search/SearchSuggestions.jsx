'use client";';

import Link from "next/link";

export default function SearchSuggestions({ categories = [], onSelect }) {
  const popularSearches = [
    "Milk",
    "Chips",
    "Burger",
    "Cold Drink",
    "Ice Cream",
  ];

  return (
    <div className="mt-4 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Popular searches
        </h3>

        <div className="flex flex-wrap gap-2">
          {popularSearches.map((item) => (
            <button
              key={item}
              onClick={() => onSelect(item)}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Browse categories
        </h3>

        <div className="flex gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/category/${cat.name}`}
              className="min-w-[90px] border rounded-lg px-3 py-2 text-center bg-white shadow-sm"
            >
              <div className="text-2xl">{cat.icon || "🛒"}</div>
              <div className="text-sm">{cat.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
