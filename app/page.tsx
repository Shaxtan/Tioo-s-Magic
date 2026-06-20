import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Truck, Gift, Sparkles, Hand, PackageCheck } from "lucide-react";
import { products } from "@/lib/products";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";

const featured = products.filter((p) => p.slug !== "charm-trio").slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* hero */}
      <section className="hero">
        <div className="container hero-grid">
          <Reveal>
            <div>
              <p className="eyebrow"><Star size={13} fill="currentColor" /> handmade · made to order</p>
              <h1 className="hero-title">
                Tiny charms,<br /><em>made with love</em>
              </h1>
              <p className="hero-sub">
                Hand-sculpted clay keychains and phone charms — strawberry bunnies, piggy buns
                and cheeseburger kitties. Each one made just for you, one at a time.
              </p>
              <div className="hero-cta">
                <Link href="/products" className="btn btn-primary">Shop the charms</Link>
                <Link href="/about" className="btn btn-ghost">How they're made</Link>
              </div>
              <div className="hero-meta">
                <span className="hero-meta-item"><Heart size={16} /> Sculpted by hand</span>
                <span className="hero-meta-item"><Truck size={16} /> Ships across India</span>
                <span className="hero-meta-item"><Gift size={16} /> Gift-wrapped</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="hero-photo">
              <div className="hero-photo-frame" style={{ animation: "float-soft 6s ease-in-out infinite" }}>
                <Image src="/products/charm-trio.jpeg" alt="A handful of handmade clay charms" width={620} height={460} priority />
              </div>
              <div className="hero-tag"><span className="hand-note">one of a kind</span></div>
              <div className="hero-blob">made<br />to order</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* marquee */}
      <div className="marquee" role="presentation">
        <span className="marquee-track">
          ✦ handmade in pune &nbsp;·&nbsp; made to order &nbsp;·&nbsp; ships across india &nbsp;·&nbsp; pocket-sized magic &nbsp;·&nbsp;
          ✦ handmade in pune &nbsp;·&nbsp; made to order &nbsp;·&nbsp; ships across india &nbsp;·&nbsp; pocket-sized magic &nbsp;·&nbsp;
        </span>
      </div>

      {/* featured */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <div>
                <p className="eyebrow"><Sparkles size={13} /> the collection</p>
                <h2 className="h-display">Meet the little ones</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/products" className="btn btn-ghost">View all charms</Link>
            </Reveal>
          </div>
          <div className="grid grid-3">
            {featured.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* how they're made */}
      <section className="section bg-deep">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "2.6rem" }}>
              <p className="eyebrow" style={{ justifyContent: "center" }}><Heart size={13} /> the Tioo's promise</p>
              <h2 className="h-display">Made by hand, never mass-produced</h2>
            </div>
          </Reveal>
          <div className="feature-grid">
            {[
              { icon: <Hand size={22} />, t: "Hand-sculpted", d: "Every charm is shaped, baked and sealed by hand — so no two are exactly alike." },
              { icon: <PackageCheck size={22} />, t: "Made to order", d: "We make yours after you order, in tiny batches, with care and zero waste." },
              { icon: <Gift size={22} />, t: "Gift-ready", d: "Each order arrives wrapped, with a little thank-you note tucked inside." },
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

      {/* story split */}
      <section className="section">
        <div className="container split">
          <Reveal>
            <div className="split-photo">
              <Image src="/products/strawberry-bunny-alt.jpeg" alt="Handmade strawberry bunny charms" width={560} height={420} />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div>
              <p className="eyebrow"><Sparkles size={13} /> our story</p>
              <h2 className="h-display">A little desk in Pune</h2>
              <p className="lead" style={{ marginTop: "1rem" }}>
                Tioo's started as a way to turn tiny daydreams into something you can carry.
                We sculpt each piece from polymer clay, paint the little details by hand, and clip
                on a cord so it&apos;s ready for your phone or bag.
              </p>
              <Link href="/about" className="btn btn-ghost" style={{ marginTop: "1.4rem" }}>Read our story</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* cta band */}
      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <span className="sparkle" style={{ position: "absolute", top: 24, left: "12%", color: "var(--gold)", opacity: 0.6 }} aria-hidden="true">
                <Sparkles size={22} />
              </span>
              <h2>Find your little charm</h2>
              <p>Browse the whole gang and pick the one that&apos;s most you — or three.</p>
              <Link href="/products" className="btn btn-primary">Shop all charms</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
