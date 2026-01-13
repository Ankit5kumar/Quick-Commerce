"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import CategoryList from "@/components/home/CategoryList";

export default function CategoryProductsPage() {
  const params = useParams();
  const categoryName = params.name;
  const [products, setProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get("/categories");
        setAllCategories(res.data.data || []);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (!categoryName) return;

    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products?category=${categoryName}`);
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Category page load error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [categoryName]);

  if (loading) {
    return <p className="text-center mt-20">Loading {categoryName}...</p>;
  }
  return (
    <div className="px-4 py-6">
      <div className="mb-4">
        <CategoryList categories={allCategories} activeCategory={categoryName} />
      </div>

      <h1 className="text-2xl font-bold mb-4 capitalize">{categoryName}</h1>

      {products.length === 0 && (
        <p className="text-gray-500">No products found in this category.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
