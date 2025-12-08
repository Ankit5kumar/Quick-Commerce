"use client";
import ProductCard from "../ProductCard";
export default function ProductRow({ title, products }) {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-bold">{title}</h2>
        <button className="text-green-600 text-sm">View All →</button>
      </div>
      <div className="mt-3 flex gap-4 overflow-x-auto pb-3">
        {products.map((p) => (
          <div key={p._id} className="min-w-[170px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
