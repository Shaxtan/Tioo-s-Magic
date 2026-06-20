"use client";

import { useState } from "react";
import { products, categories } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductsExplorer() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const shown = products.filter((p) => cat === "All" || p.category === cat);

  return (
    <>
      <div className="chips" role="tablist" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            data-on={cat === c}
            className="chip"
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid">
        {shown.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </>
  );
}
