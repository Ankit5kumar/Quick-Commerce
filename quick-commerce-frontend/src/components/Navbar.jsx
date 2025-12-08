"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
export default function Navbar() {
  const { cart } = useCart();
  console.log("navbar cart", cart);
  const total = cart.reduce((sum, item) => sum + item.quantity, 0 )
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-green-600">
        Jaldi
      </Link>

      <div className="flex gap-4">
        <Link href="/products">Products</Link>
        <Link href="/cart" className="flex items-center relative">
          Cart
          {cart.length > 0 && (
            <span className="ml-1 bg-red-500 text-white px-2 rounded-full text-sm">
              {total}
            </span>
          )}
        </Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
