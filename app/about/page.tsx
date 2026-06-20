import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Hand, Leaf, Heart } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Tioo's is a small handmade studio in Pune crafting cute polymer clay charms one at a time. Learn how each piece is sculpted, painted and made to order.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <p className="eyebrow" style={{ justifyContent: "center" }}><Sparkles size={13} /> about us</p>
          <h1>Made by hand, with a lot of heart</h1>
          <p>Tioo's is a tiny studio turning daydreams into clay charms you can carry everywhere.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container split">
          <Reveal>
            <div className="split-photo">
              <Image src="/products/piggy-bun.jpeg" alt="Handmade piggy bun charms in hand" width={560} height={420} />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="prose">
              <p>
                It started on a little desk in Pune, with a block of polymer clay and the urge to make
                something that would make people smile. One piglet led to a bunny, then a tiny
                cheeseburger cat — and Tioo's was born.
              </p>
              <p>
                Every charm is shaped by hand, baked, sanded, painted and sealed before it gets its cord
                and clasp. Because they&apos;re handmade, each one is a little different — and that&apos;s exactly
                the point.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-deep">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "2.6rem" }}>
              <p className="eyebrow" style={{ justifyContent: "center" }}><Heart size={13} /> what we believe</p>
              <h2 className="h-display">Small batch, big care</h2>
            </div>
          </Reveal>
          <div className="feature-grid">
            {[
              { icon: <Hand size={22} />, t: "One at a time", d: "No moulds, no factories. Each charm is sculpted individually." },
              { icon: <Leaf size={22} />, t: "Low waste", d: "We make to order and use recyclable packaging wherever we can." },
              { icon: <Heart size={22} />, t: "Made to be loved", d: "Little details, soft colours, and a note in every order." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 0.1}>
                <div className="feature">
                  <div className="feature-ico">{f.icon}</div>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <h2>Want one of your own?</h2>
              <p>Browse the collection, or get in touch for a custom charm.</p>
              <div style={{ display: "flex", gap: "0.7rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/products" className="btn btn-primary">Shop charms</Link>
                <Link href="/contact" className="btn btn-ghost">Request a custom</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
