"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Leaf, Check } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand" style={{ marginBottom: "0.6rem" }}>
              <Logo size={36} />
              <span className="brand-name">Tioo's</span>
            </div>
            <p>Tiny handmade clay charms, sculpted one at a time in Pune. Pocket-sized magic for your phone, bag, or keys.</p>
          </div>

          <div>
            <h4>Explore</h4>
            <div className="footer-links">
              <Link href="/products">Shop charms</Link>
              <Link href="/about">Our story</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h4>Stay in the loop</h4>
            <p style={{ fontSize: "0.9rem", opacity: 0.85, marginBottom: "0.8rem" }}>New drops &amp; restocks, first.</p>
            {joined ? (
              <p style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#fff" }}>
                <Check size={16} /> You&apos;re on the list!
              </p>
            ) : (
              <div className="news-row">
                <input
                  type="email"
                  placeholder="you@email.com"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-primary" onClick={() => email.includes("@") && setJoined(true)}>Join</button>
              </div>
            )}
            <div className="footer-social" style={{ marginTop: "1.2rem" }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram size={16} /> @Tioo's</a>
              <a href="#"><Leaf size={16} /> Small-batch &amp; handmade</a>
            </div>
          </div>
        </div>
        <p className="footer-fine">© {new Date().getFullYear()} Tioo's · Handmade with love in Pune, India</p>
      </div>
    </footer>
  );
}
