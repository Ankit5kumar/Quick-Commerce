"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import api from "@/lib/api";
import { gettoken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  
  const router = useRouter();

  const [form, setForm] = useState({
    address: "",
    phone: "",
  });

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
console.log("cart from checkout page:", cart)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = gettoken();

    if (!token) {
      alert("please login to palce order");
      router.push("/login");
      return;
    }

    try {
      const res = await api.post(
        "/order",
        {
          items: cart.map((i) => ({
            product: i.product._id,
            quantity: i.quantity,
          })),
          address: form.address,
          phone: form.phone,
          paymentMethod: "COD",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      clearCart();
      alert("Order placed successfully");
      router.push("/order-success");
    } catch (error) {
      console.log(error);
      alert("Failed to place order");
    }
  };

  return (
   <div className="bg-white p-6 shadow rounded-md">  
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
       <p className="text-lg mb-4 font-semibold">Total: ₹{totalAmount}</p>
       <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input 
        placeholder="Delivery Address"
        className="border p-2 rounded w-full"
        onChange={(e) => setForm({...form , address:e.target.value})}
        required
        />
        
        <input
          placeholder="Phone Number"
          className="border p-2 rounded w-full"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        
        <button className="bg-green-600 text-white py-2 rounded">
          Place Order (COD)
        </button>

       </form>
   </div>
  )

}
