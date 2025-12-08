import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "QuickCommerce - Coming Soon",
  description: "Get your daily essentials delivered instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <CartProvider>
          <Navbar />
          <main className="max-w-5xl mx-auto py-6">{children}</main>
        </CartProvider>
      </body>
    </html> 
  );
}
