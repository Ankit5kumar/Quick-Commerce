"use client";
import Link from "next/link";
const demo = [
  { name: "Fast Food", icon: "🍔" },
  { name: "Snacks", icon: "🍪" },
  { name: "Drinks", icon: "🥤" },
  { name: "Dairy", icon: "🥛" },
  { name: "Fruits", icon: "🍎" },
  { name: "Veggies", icon: "🥕" },
  { name: "Ice Creams", icon: "🍦" },
];

export default function CategoryList({ categories = [] , activeCategory = "" }) {
  if(!categories || categories.length === 0){
    categories = demo;
  }
  return (
    <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
      {categories.map((cat) => {
        const isActive =
          activeCategory &&
          activeCategory.toLowerCase() === cat.name.toLowerCase();

        return (
          <Link
            href={`/category/${encodeURIComponent(cat.name)}`}
            key={cat._id || cat.name}
            className={`min-w-[100px] px-3 py-2 rounded-lg border text-center whitespace-nowrap transition
              ${
                isActive
                  ? "bg-green-600 text-white border-green-600 font-semibold shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            <span className="text-xl block">{cat.icon || "🛒"}</span>
            <span className="text-sm">{cat.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
