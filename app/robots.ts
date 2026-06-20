import type { MetadataRoute } from "next";

const SITE_URL = "https://charmlings.example.com"; // ← change to your real domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
