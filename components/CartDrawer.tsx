"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Sparkles } from "lucide-react";
import { products, inr } from "@/lib/products";
import { useCart } from "./CartContext";
import CheckoutButton from "./CheckoutButton";

export default function CartDrawer() {
  const { lines, isOpen, close, step, remove, subtotal, count, toast, clearCart } = useCart();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="scrim"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="drawer-head">
                <h3><ShoppingBag size={18} /> Your bag {count > 0 && `(${count})`}</h3>
                <button className="icon-btn" onClick={close} aria-label="Close bag"><X size={20} /></button>
              </div>

              {lines.length === 0 ? (
                <div className="drawer-empty">
                  <span className="emo">🧺</span>
                  <p>Your bag is feeling a little empty.</p>
                  <button className="btn btn-primary" onClick={close}>Find a charm</button>
                </div>
              ) : (
                <>
                  <div className="drawer-items">
                    {lines.map((l) => {
                      const p = products.find((x) => x.slug === l.slug)!;
                      return (
                        <div className="drawer-row" key={l.slug}>
                          <div className="drawer-thumb">
                            <Image src={p.image} alt={p.alt} width={56} height={56} />
                          </div>
                          <div className="drawer-info">
                            <div className="nm">{p.name}</div>
                            <div className="pr">{inr(p.price)}</div>
                          </div>
                          <div className="qty">
                            <button onClick={() => step(l.slug, -1)} aria-label="Decrease"><Minus size={13} /></button>
                            <span>{l.qty}</span>
                            <button onClick={() => step(l.slug, 1)} aria-label="Increase"><Plus size={13} /></button>
                          </div>
                          <button className="row-x" onClick={() => remove(l.slug)} aria-label="Remove"><X size={15} /></button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="drawer-foot" style={{ overflowY: "auto", maxHeight: "60vh" }}>
                    <div className="subtotal"><span>Subtotal</span><strong>{inr(subtotal)}</strong></div>
                    <p className="ship-note">Free shipping across India 🇮🇳</p>
                    <CheckoutButton
                      lines={lines}
                      subtotal={subtotal}
                      onSuccess={() => { clearCart(); close(); }}
                    />
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <Sparkles size={15} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}