import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Confirmed!",
  robots: { index: false },
};

export default function OrderSuccessPage() {
  return (
    <section
      className="page-intro"
      style={{ minHeight: "60vh", display: "grid", placeContent: "center" }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <CheckCircle
          size={60}
          color="var(--sage)"
          style={{ margin: "0 auto 1.2rem" }}
        />
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          <Sparkles size={13} /> order confirmed
        </p>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontStyle: "italic" }}>
          Your charm is on its way! 🎀
        </h1>
        <p className="lead" style={{ margin: "1rem auto 2rem" }}>
          Thank you so much for your order. We'll start crafting it right away
          and reach out with shipping details soon.
        </p>
        <Link href="/products" className="btn btn-primary">
          Shop more charms
        </Link>
      </div>
    </section>
  );
}