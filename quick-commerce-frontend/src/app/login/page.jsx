"use client";
import api from "@/lib/api";
import { setToken } from "@/lib/auth";
import { useState } from "react";
export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", form);
    setToken(res.data.token);
    window.location.href = "/";
  };

  return (
    <form
      className="bg-white shadow-md p-6 rounded-md max-w-md mx-auto mt-10"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl mb-4 font-bold">Login</h2>
   
      <input
        type="email"
        placeholder="Email"
        className="w-full border mb-3 p-2 rounded"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
       <input
        type="password"
        placeholder="Password"
        className="w-full border mb-3 p-2 rounded"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="bg-green-600 text-white w-full py-2 rounded">
        Login
      </button>
    </form>
  );
}
