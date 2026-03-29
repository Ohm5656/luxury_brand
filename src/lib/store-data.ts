export type WatchSpec = {
  label: string;
  value: string;
};

export type WatchProduct = {
  slug: string;
  name: string;
  collection: string;
  category: "Dress" | "Chronograph" | "Diver" | "Skeleton";
  price: number;
  currency: "USD";
  strap: "Steel" | "Leather" | "Rubber";
  palette: string;
  badge: string;
  headline: string;
  description: string;
  features: string[];
  specs: WatchSpec[];
  heroImage: string;
  gallery: string[];
};

export type EditorialStory = {
  title: string;
  description: string;
  image: string;
};

export const brand = {
  name: "Aureline Horology",
  eyebrow: "Private watch salon",
  tagline: "Swiss-inspired timepieces curated for evenings, boardrooms, and collectors' rooms.",
  description:
    "A luxury watch storefront concept with editorial pacing, private-client atmosphere, and a clean commerce flow built for modern high-end retail.",
};

export const watchCollections = [
  {
    slug: "atelier-noir",
    title: "Atelier Noir",
    subtitle: "Architectural dress watches",
    description:
      "Thin profiles, lacquer-black dials, and warm gold reflections for clients who prefer quiet authority.",
  },
  {
    slug: "regatta-sport",
    title: "Regatta Sport",
    subtitle: "High-polish chronographs",
    description:
      "Performance silhouettes with mirror finishes, deep blue subdials, and strong wrist presence.",
  },
  {
    slug: "marine-depth",
    title: "Marine Depth",
    subtitle: "Diver and expedition pieces",
    description:
      "Water-ready cases, tool-watch character, and premium finishing designed for daily wear.",
  },
] as const;

export const editorialStories: EditorialStory[] = [
  {
    title: "Precision for candlelit evenings",
    description:
      "High-contrast dials and polished case lines photographed like jewelry, so each product page feels collectible.",
    image:
      "https://images.pexels.com/photos/16562977/pexels-photo-16562977.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Mechanical theatre on the wrist",
    description:
      "Editorial storytelling layers material, movement, and fit guidance so visitors can buy with confidence.",
    image:
      "https://images.pexels.com/photos/2799535/pexels-photo-2799535.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export const watchProducts: WatchProduct[] = [
  {
    slug: "celestium-moonphase",
    name: "Celestium Moonphase",
    collection: "Atelier Noir",
    category: "Dress",
    price: 12900,
    currency: "USD",
    strap: "Leather",
    palette: "Onyx / Champagne",
    badge: "Collector favorite",
    headline: "A moonphase dress watch with lacquer depth and warm gold architecture.",
    description:
      "Celestium Moonphase is shaped for black-tie evenings and private dining rooms, pairing a slim bezel with warm metal accents and a soft leather strap.",
    features: [
      "Polished case with warm gold finishing",
      "Moonphase aperture and date window",
      "Concierge strap sizing included",
    ],
    specs: [
      { label: "Movement", value: "Automatic moonphase" },
      { label: "Case", value: "39mm polished steel with gold bezel" },
      { label: "Power reserve", value: "72 hours" },
      { label: "Water resistance", value: "50m" },
      { label: "Crystal", value: "Sapphire, anti-reflective" },
    ],
    heroImage:
      "https://images.pexels.com/photos/15997560/pexels-photo-15997560.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gallery: [
      "https://images.pexels.com/photos/15997560/pexels-photo-15997560.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/16562985/pexels-photo-16562985.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4863139/pexels-photo-4863139.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    slug: "obsidian-reserve",
    name: "Obsidian Reserve",
    collection: "Atelier Noir",
    category: "Dress",
    price: 9800,
    currency: "USD",
    strap: "Leather",
    palette: "Midnight / Rose gold",
    badge: "Evening essential",
    headline: "A minimal dress reference with dark-dial drama and a rose-metal glow.",
    description:
      "Obsidian Reserve brings a more restrained profile for clients who want a sharp cuff silhouette with discreet luxury cues.",
    features: [
      "Slim 8.9mm case profile",
      "Hand-applied indices with rose accents",
      "Double-stitched alligator-pattern strap",
    ],
    specs: [
      { label: "Movement", value: "Automatic three-hand" },
      { label: "Case", value: "38mm polished steel" },
      { label: "Power reserve", value: "60 hours" },
      { label: "Water resistance", value: "30m" },
      { label: "Dial", value: "Black enamel sunburst" },
    ],
    heroImage:
      "https://images.pexels.com/photos/16562985/pexels-photo-16562985.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gallery: [
      "https://images.pexels.com/photos/16562985/pexels-photo-16562985.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/16562977/pexels-photo-16562977.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1432234/pexels-photo-1432234.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    slug: "regatta-rsx-chronograph",
    name: "Regatta RSX Chronograph",
    collection: "Regatta Sport",
    category: "Chronograph",
    price: 15400,
    currency: "USD",
    strap: "Steel",
    palette: "Blue steel / Platinum",
    badge: "Performance icon",
    headline: "A blue-dial chronograph engineered for movement, reflection, and boardroom presence.",
    description:
      "Regatta RSX Chronograph uses a layered blue dial, polished pushers, and a steel bracelet to deliver sport energy with luxury finishing.",
    features: [
      "Tri-compax chronograph dial",
      "Integrated steel bracelet",
      "Fast-release micro adjustment clasp",
    ],
    specs: [
      { label: "Movement", value: "Automatic chronograph" },
      { label: "Case", value: "42mm steel case" },
      { label: "Power reserve", value: "68 hours" },
      { label: "Water resistance", value: "100m" },
      { label: "Dial", value: "Layered metallic blue" },
    ],
    heroImage:
      "https://images.pexels.com/photos/2799535/pexels-photo-2799535.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gallery: [
      "https://images.pexels.com/photos/2799535/pexels-photo-2799535.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4863139/pexels-photo-4863139.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/15997560/pexels-photo-15997560.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    slug: "tessaro-grand-tour",
    name: "Tessaro Grand Tour",
    collection: "Regatta Sport",
    category: "Chronograph",
    price: 11200,
    currency: "USD",
    strap: "Steel",
    palette: "Silver / Warm graphite",
    badge: "Travel companion",
    headline: "A polished chronograph with broad markers and touring-era confidence.",
    description:
      "Tessaro Grand Tour delivers a brighter dial expression and stronger tool-watch character while staying refined enough for tailoring.",
    features: [
      "High-legibility silver dial",
      "Tachymeter bezel with polished edge",
      "Balanced weight for daily wrist comfort",
    ],
    specs: [
      { label: "Movement", value: "Swiss automatic chronograph" },
      { label: "Case", value: "41mm steel case" },
      { label: "Power reserve", value: "62 hours" },
      { label: "Water resistance", value: "100m" },
      { label: "Bracelet", value: "Three-link brushed steel" },
    ],
    heroImage:
      "https://images.pexels.com/photos/4863139/pexels-photo-4863139.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gallery: [
      "https://images.pexels.com/photos/4863139/pexels-photo-4863139.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1432234/pexels-photo-1432234.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2799535/pexels-photo-2799535.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    slug: "abyssal-diver-300",
    name: "Abyssal Diver 300",
    collection: "Marine Depth",
    category: "Diver",
    price: 8700,
    currency: "USD",
    strap: "Rubber",
    palette: "Black / Steel",
    badge: "Adventure ready",
    headline: "A diver with a shadow-black dial and the polished heft luxury clients still expect.",
    description:
      "Abyssal Diver 300 balances utility and refinement with a ceramic bezel, strong lume, and a clean case silhouette designed to transition beyond weekends.",
    features: [
      "300m water resistance",
      "Ceramic timing bezel",
      "Integrated rubber strap with deployant clasp",
    ],
    specs: [
      { label: "Movement", value: "Automatic diver movement" },
      { label: "Case", value: "40mm steel case" },
      { label: "Power reserve", value: "70 hours" },
      { label: "Water resistance", value: "300m" },
      { label: "Bezel", value: "Ceramic unidirectional" },
    ],
    heroImage:
      "https://images.pexels.com/photos/1432234/pexels-photo-1432234.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gallery: [
      "https://images.pexels.com/photos/1432234/pexels-photo-1432234.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2799535/pexels-photo-2799535.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4863139/pexels-photo-4863139.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    slug: "skeleton-atelier-x",
    name: "Skeleton Atelier X",
    collection: "Atelier Noir",
    category: "Skeleton",
    price: 16700,
    currency: "USD",
    strap: "Steel",
    palette: "Graphite / Sapphire blue",
    badge: "Limited run",
    headline: "A sculptural open-work piece with reflective depth and gallery-like presentation.",
    description:
      "Skeleton Atelier X is built for collectors who want the movement to become the visual centerpiece, framed by premium metal finishing and sapphire clarity.",
    features: [
      "Open-worked bridges with smoked tint",
      "Exhibition caseback",
      "Numbered annual production",
    ],
    specs: [
      { label: "Movement", value: "Automatic skeleton caliber" },
      { label: "Case", value: "41mm mixed-finish steel" },
      { label: "Power reserve", value: "80 hours" },
      { label: "Water resistance", value: "50m" },
      { label: "Edition", value: "No. 01-150 yearly" },
    ],
    heroImage:
      "https://images.pexels.com/photos/16562977/pexels-photo-16562977.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gallery: [
      "https://images.pexels.com/photos/16562977/pexels-photo-16562977.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/16562985/pexels-photo-16562985.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/15997560/pexels-photo-15997560.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
];

export const featuredSlugs = [
  "celestium-moonphase",
  "regatta-rsx-chronograph",
  "skeleton-atelier-x",
] as const;

export const cartStorageKey = "aureline-cart-v1";

export function getProductBySlug(slug: string) {
  return watchProducts.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 3) {
  const product = getProductBySlug(slug);

  if (!product) {
    return [];
  }

  return watchProducts
    .filter((candidate) => candidate.slug !== product.slug)
    .filter(
      (candidate) =>
        candidate.collection === product.collection || candidate.category === product.category,
    )
    .slice(0, limit);
}

export function formatPrice(price: number, currency: "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
