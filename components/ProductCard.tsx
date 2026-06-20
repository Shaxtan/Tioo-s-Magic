"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Product, inr } from "@/lib/products";
import { useCart } from "./CartContext";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  return (
    <motion.article
      className="charm-card"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
    >
      <span className="cord" aria-hidden="true">
        <span className="cord-line" />
        <span className="cord-clasp" />
      </span>
      <div className="card-body">
        <div className="card-photo">
          {product.badge && <span className={`card-badge badge-${product.badge}`}>{product.badge}</span>}
          <Image src={product.image} alt={product.alt} fill sizes="(max-width: 620px) 50vw, 280px" />
        </div>
        <div className="card-info">
          <p className="card-cat">{product.category}</p>
          <h3 className="card-name">{product.name}</h3>
          <p className="card-tag">{product.tagline}</p>
          <div className="card-foot">
            <span className="card-price">{inr(product.price)}</span>
            <button className="add-btn" onClick={() => add(product.slug)} aria-label={`Add ${product.name} to bag`}>
              <Plus size={15} strokeWidth={2.6} /> Add
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
