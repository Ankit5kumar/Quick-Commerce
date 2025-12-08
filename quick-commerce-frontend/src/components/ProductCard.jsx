import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";


export default function ProductCard({ product }) {
  const { cart, addToCart, removefromCart } = useCart();
console.log("data from in product card:", product);
  const existing = cart.find((item) => item.product._id === product._id);
  const initialQty = existing ? existing.quantity : 0;

  const [quantiy, setQuantity] = useState(initialQty);

  useEffect(() => {
    setQuantity(initialQty);
  }, [cart]);

  const increment = () => {
    setQuantity((q) => q + 1);
    addToCart(product, 1);
  };

  const decrement = () => {
    if (quantiy === 1) {
      setQuantity(0);
      removefromCart(product._id);
      return;
    }
    setQuantity((q) => q - 1);
    addToCart(product, -1); 
  };

  return (
    <>
      <div className="bg-white shadow p-4 rounded-md flex flex-col items-center hover:shadow-lg transition cursor-pointer">
        <Link
          href={`/products/${product._id}`}
          className="bg-white shadow p-4 rounded-md"
        >
          <img
            src={product.image}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-lg font-bold mt-2">{product.name}</h2>
          <p className="text-green-600 font-bold">₹{product.price}</p>
        </Link>

        {quantiy === 0 ? (
          <button
            onClick={() => increment()}
            className="mt-2 bg-green-600 text-white py-1 px-4 rounded w-full"
          >
            Add
          </button>
        ) : (
          <div className="mt-2 flex items-center justify-between w-full bg-gray-100 px-3 py-1 rounded">
            <button
              onClick={decrement}
              className="bg-gray-300 px-2 py-1 rounded text-lg font-bold"
            >
              -
            </button>

            <span className="text-lg font-semibold">{quantiy}</span>

            <button
              onClick={increment}
              className="bg-gray-300 px-2 py-1 rounded text-lg font-bold"
            >
              +
            </button>
          </div>
        )}
      </div>
    </>
  );
}
