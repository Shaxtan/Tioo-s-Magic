"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import Logo from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const { count, open } = useCart();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="Tioo's home">
          <Logo size={40} />
          <span className="brand-name">Tioo's</span>
        </Link>

        <nav className="nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link" data-active={pathname === l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <button className="icon-btn cart-btn" onClick={open} aria-label="Open bag">
            <ShoppingBag size={19} />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
