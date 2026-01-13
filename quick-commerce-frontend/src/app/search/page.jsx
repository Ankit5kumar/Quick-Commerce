"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { useSearchParams, useRouter } from "next/navigation";
import SearchSuggestions from "@/components/search/SearchSuggestions";
export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // 🔹 Update URL when typing
  const updateURL = (value) => {
    const params = new URLSearchParams();
    if (value) params.set("q", value);
    router.replace(`/search?${params.toString()}`);
  };

  // 🔹 Call backend search API
  const searchProducts = async (keyword) => {
    if (!keyword) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(`/products?search=${keyword}`);
      setResults(res.data.data || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ THIS FUNCTION WAS MISSING — ROOT CAUSE OF ERROR
  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    updateURL(value);

    if (timeoutId) clearTimeout(timeoutId);

    const id = setTimeout(() => {
      searchProducts(value);
    }, 500);

    setTimeoutId(id);
  };

  // 🔹 Run search if user lands on /search?q=something
  useEffect(() => {
    if (initialQuery) {
      searchProducts(initialQuery);
    }
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.data || []);
      } catch (err) {
        console.error("Failed to load categories");
      }
    };
    loadCategories();
  });

  const handleSuggestionSelect = (item) => {
    setQuery(value);
    updateURL(value);
    searchProducts(value);
  };

  return (
    <div className="px-4 py-5">
      {/* Search Input */}
      <input
        autoFocus
        value={query}
        onChange={handleInput}
        placeholder="Search for snacks, drinks, fast food..."
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
      />

      {/* Loading */}

      {!query && (
        <SearchSuggestions
          categories={categories}
          onSelect={handleSuggestionSelect}
        />
      )}

      {loading && <p className="mt-4 text-gray-500">Searching...</p>}

      {/* No results */}
      {!loading && query && results.length === 0 && (
        <p className="mt-4 text-gray-500">No products found for “{query}”</p>
      )}

      {/* Results */}
      {query && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {results.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
