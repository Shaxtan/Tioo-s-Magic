import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const SITE_URL = "https://tioo-s-magic-xw3f.vercel.app"; // ← change to your real domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tioo's — Handmade Clay Charms & Keychains",
    template: "%s · Tioo's",
  },
  description:
    "Tiny handmade clay charms, keychains and phone charms — strawberry bunnies, piggy buns and cheeseburger kitties, sculpted one at a time in Pune, India.",
  keywords: [
    "handmade clay charms",
    "cute keychains",
    "phone charms",
    "polymer clay charms India",
    "kawaii charms",
    "strawberry bunny charm",
    "handmade gifts Pune",
  ],
  authors: [{ name: "Tioo's" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Tioo's",
    title: "Tioo's — Handmade Clay Charms & Keychains",
    description:
      "Cute, handmade clay charms and keychains, sculpted one at a time. Pocket-sized magic for your phone, bag, or keys.",
    images: [{ url: "/products/charm-trio.jpeg", width: 1200, height: 1200, alt: "Handmade clay charms" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tioo's — Handmade Clay Charms & Keychains",
    description: "Cute, handmade clay charms and keychains, sculpted one at a time in Pune.",
    images: ["/products/charm-trio.jpeg"],
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Tioo's",
  description: "Handmade clay charms and keychains, sculpted one at a time in Pune, India.",
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
