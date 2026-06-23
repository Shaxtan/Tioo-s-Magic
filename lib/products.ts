export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: "Animal charms" | "Food charms" | "Bundles";
  image: string;
  alt: string;
  badge?: "Bestseller" | "New" | "Value";
};

// Prices are placeholders — adjust to your real pricing.
export const products: Product[] = [
  {
    slug: "strawberry-bunny",
    name: "Strawberry Bunny",
    tagline: "A tiny bunny nestled in a ripe strawberry.",
    description:
      "A hand-sculpted bunny peeking out of a glossy red strawberry, finished with a soft blush and a phone-strap cord. Made to order, one at a time.",
    price: 1,
    category: "Animal charms",
    image: "/products/strawberry-bunny.jpeg",
    alt: "Handmade clay bunny sitting in a red strawberry charm",
    badge: "Bestseller",
  },
  {
    slug: "piggy-bun",
    name: "Piggy Bun",
    tagline: "A blushing piglet with a little bun on top.",
    description:
      "A round, rosy piglet topped with a freshly baked bun. Sculpted and sealed by hand, ready to clip onto a phone, bag, or keys.",
    price: 9,
    category: "Animal charms",
    image: "/products/piggy-bun.jpeg",
    alt: "Handmade pink clay piglet charm with a bun on its head",
    badge: "New",
  },
  {
    slug: "cheeseburger-kitty",
    name: "Cheeseburger Kitty",
    tagline: "A kitty stacked high in a juicy burger.",
    description:
      "A sleepy cat face crowning a tiny cheeseburger — lettuce, tomato, cheese and all. A pocket-sized snack that never goes stale.",
    price: 9,
    category: "Food charms",
    image: "/products/cheeseburger-kitty.jpeg",
    alt: "Handmade clay cat cheeseburger charm",
  },
  {
    slug: "charm-trio",
    name: "Charm Trio Bundle",
    tagline: "Pick any three — the whole little gang.",
    description:
      "Choose any three charms and save. Perfect as a gift set or for keeping one and sharing the rest. Each one made to order with love.",
    price: 749,
    category: "Bundles",
    image: "/products/charm-trio.jpeg",
    alt: "A handful of three handmade clay charms",
    badge: "Value",
  },
];

export const categories = ["All", "Animal charms", "Food charms", "Bundles"] as const;

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
