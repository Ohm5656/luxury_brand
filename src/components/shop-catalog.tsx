"use client";

import { startTransition, useDeferredValue, useMemo, useState } from "react";
import { Reveal } from "@/components/luxury-motion";
import { ProductCard } from "@/components/product-card";
import { watchProducts } from "@/lib/store-data";

const categories = ["All", "Dress", "Chronograph", "Diver", "Skeleton"] as const;
const straps = ["All", "Leather", "Steel", "Rubber"] as const;

export function ShopCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [strap, setStrap] = useState<(typeof straps)[number]>("All");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const products = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    const filtered = watchProducts.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesStrap = strap === "All" || product.strap === strap;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [product.name, product.collection, product.headline, product.description]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesStrap && matchesQuery;
    });

    if (sort === "price-asc") {
      return filtered.toSorted((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      return filtered.toSorted((a, b) => b.price - a.price);
    }

    return filtered;
  }, [category, deferredQuery, sort, strap]);

  return (
    <section className="px-4 pb-24 pt-8 sm:px-6 lg:px-10 lg:pb-32 lg:pt-14">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent-strong)]">
            Catalog
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[0.94] text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            Browse luxury references with speed, clarity, and private-client atmosphere.
          </h1>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-7 text-[var(--color-text-muted)] sm:text-base sm:leading-8">
            Filter by category, strap, and intent without breaking the premium mood. Search updates are deferred so the UI stays responsive while clients browse.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="luxury-panel mt-8 rounded-[1.7rem] p-4 sm:mt-10 sm:rounded-[2rem] sm:p-5">
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            <label className="grid gap-2 text-sm text-[var(--color-text-soft)]">
              Search references
              <input
                className="min-h-12 rounded-[1.2rem] border border-white/10 bg-black/10 px-4 text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-border-strong)]"
                placeholder="Moonphase, skeleton, blue dial..."
                type="search"
                value={query}
                onChange={(event) => {
                  const value = event.target.value;
                  startTransition(() => {
                    setQuery(value);
                  });
                }}
              />
            </label>

            <FilterSelect
              label="Category"
              value={category}
              options={categories}
              onChange={(value) => {
                startTransition(() => {
                  setCategory(value as (typeof categories)[number]);
                });
              }}
            />
            <FilterSelect
              label="Strap"
              value={strap}
              options={straps}
              onChange={(value) => {
                startTransition(() => {
                  setStrap(value as (typeof straps)[number]);
                });
              }}
            />
            <FilterSelect
              label="Sort"
              value={sort}
              options={["featured", "price-asc", "price-desc"]}
              onChange={(value) => {
                startTransition(() => {
                  setSort(value as "featured" | "price-asc" | "price-desc");
                });
              }}
            />
          </div>
        </Reveal>

        <div className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-text-soft)]">
            {products.length} references available
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Ready for purchase with product pages and checkout flow
          </p>
        </div>

        {products.length === 0 ? (
          <div className="luxury-panel mt-8 rounded-[1.7rem] p-6 text-center sm:rounded-[2rem] sm:p-8">
            <h2 className="font-serif text-3xl text-[var(--color-text-primary)]">
              No matching watches
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
              Try a broader search or clear one of the filters to see more references.
            </p>
          </div>
        ) : (
          <div className={`mt-8 grid gap-4 transition-opacity duration-300 sm:gap-6 xl:grid-cols-3 ${isStale ? "opacity-75" : "opacity-100"}`}>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm text-[var(--color-text-soft)]">
      {label}
      <select
        className="min-h-12 rounded-[1.2rem] border border-white/10 bg-black/10 px-4 text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-border-strong)]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {prettyLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function prettyLabel(value: string) {
  const labels: Record<string, string> = {
    featured: "Featured",
    "price-asc": "Price: Low to high",
    "price-desc": "Price: High to low",
  };

  return labels[value] ?? value;
}
