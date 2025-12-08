"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

import { getToken } from "@/lib/auth";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = getToken();

    api
      .get("/order/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrders(res.data.orders));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map((order) => (
        <div
          className="border p-4 rounded mb-4 bg-gray-50 shadow"
          key={order._id}
        >
          <p className="font-semibold">Order ID: {order._id}</p>
          <p className="text-green-600 font-semibold mt-1">
            Total: ₹{order.totalAmount}
          </p>
          <p className="text-sm mt-1">Status: {order.status}</p>
           <ul className="ml-4 list-disc mt-2">
            {order.items.map((i) => (
              <li key={i._id}>
                {i.product.name} x {i.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
