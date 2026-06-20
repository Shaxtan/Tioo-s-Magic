# Charmlings — handmade clay charms storefront

A 4-page Next.js 14 (App Router) storefront for handmade clay charms, with a cream/pink
fairytale design, Framer Motion animations, a working cart drawer, and SEO baked in.

## Pages
- `/` — home (hero, featured charms, "how they're made", story, CTA)
- `/products` — full catalogue with category filter + add-to-bag
- `/about` — brand story
- `/contact` — contact details + form

## Run it locally

You need **Node.js 18.17+** installed.

```bash
# 1. install dependencies
npm install

# 2. start the dev server
npm run dev
```

Then open **http://localhost:3000**.

To build for production:

```bash
npm run build
npm start
```

## Before you go live — quick checklist

1. **Rename the brand.** "Charmlings" is a placeholder. Search-and-replace it in
   `app/layout.tsx`, `components/Nav.tsx`, `components/Footer.tsx`, and the page copy.
2. **Set your real domain.** Replace `https://charmlings.example.com` in
   `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` (used for SEO + Open Graph).
3. **Check prices & product copy** in `lib/products.ts`.
4. **Fill in real contact details** in `app/contact/page.tsx` and `components/Footer.tsx`
   (email, Instagram, WhatsApp).
5. **Wire up the contact form** in `components/ContactForm.tsx` — easiest is
   [Formspree](https://formspree.io) or a Next.js route handler with [Resend](https://resend.com).
6. **Turn on image optimization** for production: set `images.unoptimized` to `false`
   in `next.config.mjs` (Next will use `sharp` automatically).

## Product photos
Your photos live in `public/products/`. Swap them anytime — keep the same filenames
or update the `image` paths in `lib/products.ts`.

## Next phase — real checkout (Shopify + Razorpay)
The cart works in-memory and the checkout button is a placeholder. To take real
payments, the cleanest path for India is **Shopify as the backend + Razorpay as the
gateway**, with this site as a custom storefront via Shopify's Storefront API.
That's the next milestone.

## Deploy
This deploys to [Vercel](https://vercel.com) in a couple of clicks — push to GitHub,
import the repo, done. (Remember to set image optimization back on and update the domain.)
