import Link from "next/link";
import { brand } from "@/lib/store-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-serif text-3xl text-[var(--color-text-primary)]">
            {brand.name}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--color-text-muted)]">
            {brand.description}
          </p>
        </div>

        <div className="grid gap-3 text-sm text-[var(--color-text-soft)] sm:grid-cols-3">
          <Link className="transition hover:text-[var(--color-text-primary)]" href="/">
            Home
          </Link>
          <Link className="transition hover:text-[var(--color-text-primary)]" href="/shop">
            Shop
          </Link>
          <Link className="transition hover:text-[var(--color-text-primary)]" href="/checkout">
            Checkout
          </Link>
        </div>
      </div>
    </footer>
  );
}
