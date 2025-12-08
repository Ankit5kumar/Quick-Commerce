"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (product, quantity = 1) => {
    if (quantity === 0) return;
    setCart((prev) => {
      const exists = prev.find((item) => item.product._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (product, newQuantity) => {
    setCart((prev) => {
      if (newQuantity <= 0) {
        return prev.filter((item) => item.product._id !== product._id);
      }
      const exists = prev.find((item) => item.product._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
     return [...prev, { product ,   quantity: newQuantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.product._id !== id));
  };

  const clearCart = () => setCart([]);
  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity , removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
