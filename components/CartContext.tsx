"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { products } from "@/lib/products";

type Line = { slug: string; qty: number };

type CartValue = {
  lines: Line[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  toast: string | null;
  add: (slug: string) => void;
  step: (slug: string, delta: number) => void;
  remove: (slug: string) => void;
  clearCart: () => void;
  open: () => void;
  close: () => void;
};

const CartCtx = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const flashToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout((window as any).__cartToast);
    (window as any).__cartToast = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const add = useCallback(
    (slug: string) => {
      setLines((prev) => {
        const found = prev.find((l) => l.slug === slug);
        return found
          ? prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + 1 } : l))
          : [...prev, { slug, qty: 1 }];
      });
      const p = products.find((x) => x.slug === slug);
      if (p) flashToast(`${p.name} added to bag`);
    },
    [flashToast]
  );

  const step = useCallback((slug: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.slug === slug ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => {
    const p = products.find((x) => x.slug === l.slug);
    return s + (p ? p.price * l.qty : 0);
  }, 0);

  return (
    <CartCtx.Provider
      value={{
        lines, count, subtotal, isOpen, toast,
        add, step, remove, clearCart,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}