"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const total = cart.reduce((sum, item) => {
    const price = Number(item.product?.price) || 0;
    const qty = Number(item.quantity) || 0;
    return sum + price * qty;
  }, 0);

  const totalItems = cart.reduce((s, i) => s + (Number(i.quantity) || 0), 0);
  const handlecreament = (item) => {
    const newQty = (Number(item.quantity) || 0) + 1;
    updateQuantity(item.product, newQty);
  };
  const handleDecrement = (item) => {
    const newQty = (Number(item.quantity) || 0) - 1;
    updateQuantity(item.product, newQty);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
        <Link href="/products" className="text-green-600 underline mt-4 block">
          Continue Shopping
        </Link>
      </div>
    );
  }
  return (
    <div className="bg-white shadow-md p-6 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {cart.map((item) => {
          const price = Number(item.product?.price) || 0;
          const qty = Number(item.quantity) || 0;
          return (
            <div
              key={item.product._id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-sm text-gray-500">₹{price} each</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded">
                  <button
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease quantity of ${item.product.name}`}
                    className="bg-gray-300 cursor-pointer px-2 py-1 rounded text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{qty}</span>
                  <button
                    onClick={() => handlecreament(item)}
                    aria-label={`Increase quantity of ${item.product.name}`}
                    className="bg-gray-300 cursor-pointer px-2 py-1 rounded text-lg font-bold"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-bold">₹{price * qty}</p>
                  {/* Remove link if user wants to remove directly */}
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-sm cursor-pointer text-red-600 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Items: {totalItems}</p>
          <h2 className="text-xl font-bold">Total: ₹{total}</h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/checkout")}
            className="bg-green-600 cursor-pointer text-white py-2 px-6 rounded"
          >
            Proceed to Checkout
          </button>

          <Link
            href="/products"
            className="border cursor-pointer border-gray-300 py-2 px-4 rounded text-gray-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
