"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import CategoryList from "@/components/home/CategoryList";
import ProductRow from "@/components/home/ProductRow";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const PRODUCTS_PER_ROW = 8;

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const catRes = await api.get("/categories");
        const categoriesData = catRes.data.data || catRes.data || [];

        if (!mounted) return;
        setCategories(categoriesData);

        const rowsPromises = (categoriesData || []).map(async (cat) => {
          try {
            const pRes = await api.get(
              `/products?category=${encodeURIComponent(
                cat.name
              )}&limit=${PRODUCTS_PER_ROW}}`
            );

            const prods = pRes.data.data || pRes.data || [];
            return { category: cat, products: prods };
          } catch (error) {
            return { category: cat, products: [] };
          }
        });
        const rowsData = await Promise.all(rowsPromises);
        if (!mounted) return;
        setRows(rowsData);
      } catch (err) {
        console.error("Failed to load home data:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading home...</p>;
  }

  return (
    <div className="mt-4 mb-4">
      <h2 className="text-2xl font-bold">Delivery in 10 minutes</h2>
      <p className="text-gray-600">Fresh food & essentials at your doorstep</p>
      <input
        placeholder="Search for fast food, snacks, drinks..."
        className="mt-3 w-full px-4 py-2 border rounded-lg shadow-sm"
        onFocus={() => router.push("/search")}
        readOnly
      />
      <CategoryList categories={categories} />

     { rows.map((r)=>(
      <ProductRow 
      key={r.category._id}
      title={r.category.name}
      products={r.products}
      caategory={r.category}
      />
     ))}
     
      {/* Show message if no rows */}
      {rows.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No categories or products available.</p>
      )}
    </div>
  );
}
