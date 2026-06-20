/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set to false in production to enable Next.js image optimization (requires `sharp`).
  // Left unoptimized so the project runs anywhere with zero extra setup.
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
