"use client";

import { ReactNode } from "react";
import { CartProvider } from "./CartContext";
import Nav from "./Nav";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import Sparkles from "./Sparkles";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Sparkles />
      <Nav />
      <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
