"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatPrice, type WatchProduct } from "@/lib/store-data";

export function ProductCard({
  product,
  priority = false,
}: {
  product: WatchProduct;
  priority?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const flightSourceId = `flight-source-${product.slug}`;

  return (
    <motion.article
      className="group luxury-panel overflow-hidden rounded-[1.55rem] sm:rounded-[1.7rem]"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -10 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        className="block"
        href={`/product/${product.slug}`}
        aria-label={`View ${product.name}`}
      >
        <div
          className="luxury-photo-frame relative aspect-[1.04] overflow-hidden border-b border-white/10 sm:aspect-[0.92] xl:aspect-[0.84]"
          id={flightSourceId}
        >
          <Image
            alt={product.headline}
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            src={product.heroImage}
          />
          <div className="absolute left-3 top-3 rounded-full border border-[var(--color-border-strong)] bg-black/35 px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-[var(--color-accent-soft)] sm:left-4 sm:top-4 sm:text-[0.68rem] sm:tracking-[0.28em]">
            {product.badge}
          </div>
          <div className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-[rgba(9,9,9,0.5)] px-3 py-1 text-xs font-semibold text-[var(--color-text-primary)] backdrop-blur-md sm:bottom-4 sm:right-4">
            {formatPrice(product.price, product.currency)}
          </div>
        </div>
      </Link>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[var(--color-text-soft)] sm:text-[0.72rem] sm:tracking-[0.28em]">
              {product.collection}
            </p>
            <Link href={`/product/${product.slug}`}>
              <h3 className="mt-2 font-serif text-[1.7rem] leading-none text-[var(--color-text-primary)] transition group-hover:text-[var(--color-accent-soft)] sm:text-3xl">
                {product.name}
              </h3>
            </Link>
          </div>
        </div>

        <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
          {product.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
            {product.category}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
            {product.strap}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
            {product.palette}
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <AddToCartButton
            className="flex-1"
            flightImageSrc={product.heroImage}
            flightSourceId={flightSourceId}
            label="Add to bag"
            slug={product.slug}
          />
          <Link
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-border-strong)] hover:bg-white/6"
            href={`/product/${product.slug}`}
          >
            View details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
