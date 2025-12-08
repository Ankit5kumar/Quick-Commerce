"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useParams , useRouter } from "next/navigation";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const { id } = params || {};

  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Load product details
  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data.data));
  }, [id]);

  // Sync quantity if product already exists in cart
  useEffect(() => {
    const exists = cart.find((item) => item.product._id === id);
    if (exists) {
      setQuantity(exists.quantity);
    }
  }, [cart, id]);

  if (!product) return <p>Loading...</p>;

  const increment = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);

    updateQuantity(product, newQty); // sync to cart
  };

  const decrement = () => {
    const newQty = quantity - 1;

    if (newQty <= 0) {
      setQuantity(0);
      removeFromCart(product._id); // remove item
      return;
    }

    setQuantity(newQty);
    updateQuantity(product, newQty); // sync
  };

  const handleAddToCart = () => {
    updateQuantity(product, quantity);
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="bg-white p-6 shadow rounded-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-72 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-lg mt-2 text-gray-700">{product.description}</p>

      <p className="text-green-600 mt-3 text-2xl font-bold">
        ₹{totalPrice}
        <span className="text-sm text-gray-500">
          {" "}
          (₹{product.price} × {quantity})
        </span>
      </p>

      {/* QUANTITY SELECTOR */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={decrement}
          className="bg-gray-200 px-3 py-1 rounded text-xl"
        >
          -
        </button>

        <span className="text-xl font-semibold">{quantity}</span>

        <button
          onClick={increment}
          className="bg-gray-200 px-3 py-1 rounded text-xl"
        >
          +
        </button>
      </div>

      {/* ADD / UPDATE CART */}

      {quantity === 0 ? (
        <button
          onClick={handleAddToCart}
          className="mt-6 cursor-pointer bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
        >
          add To Cart
        </button>
      ) : cart.find((item) => item.product._id === id) ? (
        <button
          onClick={() => router.push("/cart")}
          className="mt-6 cursor-pointer bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          View Cart
        </button>
      ) : (
        <button
          onClick={() => handleAddToCart()}
          className="mt-6 cursor-pointer bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
        >
          Add {quantity} to Cart
        </button>
      )}
    </div>
  );
}
