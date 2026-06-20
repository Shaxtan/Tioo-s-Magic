import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { products } from "@/lib/products";
import ProductsExplorer from "@/components/ProductsExplorer";

export const metadata: Metadata = {
  title: "Shop Handmade Charms & Keychains",
  description:
    "Browse all Tioo's — handmade clay keychains and phone charms including strawberry bunnies, piggy buns and cheeseburger kitties. Made to order in Pune, India.",
  alternates: { canonical: "/products" },
};

const productListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: p.description,
      category: p.category,
      offers: { "@type": "Offer", price: p.price, priceCurrency: "INR", availability: "https://schema.org/InStock" },
    },
  })),
};

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }} />

      <section className="page-intro">
        <div className="container">
          <p className="eyebrow" style={{ justifyContent: "center" }}><Sparkles size={13} /> the whole collection</p>
          <h1>Pick your little magic</h1>
          <p>Every charm is hand-sculpted and made to order. Choose a favourite — or bundle three and save.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container">
          <ProductsExplorer />
        </div>
      </section>
    </>
  );
}
