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

export default function CategoryList({ categories = [] }) {
  if(!categories || categories.length === 0){
    categories = demo;
  }
  return (
    <div className="mt-6 flex gap-4 overflow-x-auto pb-3">
      {categories.map((cat) => (
      
        <Link
          href={`/category/${encodeURIComponent(cat.name)}`}
          key={cat._id || cat.name}
          className="min-w-[90px] bg-white border rounded-lg shadow px-3 py-2 flex flex-col items-center"
          
        >
          <span className="text-3xl">{cat.icon || "🛒"}</span>
          <span className="mt-1 text-sm font-medium">{cat.name}</span>
        </Link>
      ))}
    </div>
  );
}
