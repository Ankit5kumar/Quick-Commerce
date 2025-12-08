"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data.data));
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
