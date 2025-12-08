'use client'

import { useEffect, useState } from "react";
import api from "@/lib/api";
import CategoryList from "@/components/home/CategoryList";
import ProductRow from "@/components/home/ProductRow";
export default function Home() {
  const [categories, setCategories] = useState([]);
  const [rows , setRows] = useState([]);
  const [loading , setLoading] = useState(true);

  const PRODUCTS_PER_ROW = 8;

  useEffect(() => {
    let mounted = true;
    
    const load = async () =>{
      setLoading(true);
      try {
        const catRes = await api.get("/api/categories");
        const categoriesData = catRes.data.data || catRes.data || [];

        if(!mounted) return;
        setCategories(categoriesData);

        const rowsPromises = (categoriesData || []).map(async (cat) => {

          try {
            const pRes = await api.get(`/products?category=${encodeURIComponent(cat.name)}&limit=${PRODUCTS_PER_ROW}}`);
            
            const prods = pRes.data.data || pRes.data || [];
            return {category: cat, products: prods }
          } catch (error) {
            return { category: cat, products: [] };
          }
        })
        const rowsData = await Promise.all(rowsPromises)
        if(!mounted) return ;
        setRows(rowsData)
      } catch (error) {
        console.error("Failed to load home data:", err);
      } finally{
        if(mounted) setLoading(false);
      }
    }
    load();
  return () => {
    mounted=false;
  }
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
      />
      <CategoryList categories={categories} />
      
      <ProductRow title="Fast Food Near You" products={products.slice(0, 5)} />
      <ProductRow title="Snacks & Biscuits" products={products.slice(5, 10)} />
      <ProductRow title="Beverages" products={products.slice(10, 15)} />
      <ProductRow title="Dairy Essentials" products={products.slice(15, 20)} />
     

    </div>
  );
}
