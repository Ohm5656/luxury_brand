"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { brand } from "@/lib/store-data";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/checkout", label: "Checkout" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-full focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-[var(--color-background)]"
        href="#main-content"
      >
        Skip to content
      </a>

      <div className="border-b border-white/10 bg-[rgba(9,9,9,0.82)] px-4 py-2.5 text-center text-[0.62rem] uppercase tracking-[0.28em] text-[var(--color-text-soft)] backdrop-blur-xl sm:text-[0.7rem] sm:tracking-[0.34em]">
        Private salon appointments available - Complimentary concierge sourcing on select references
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(9,9,9,0.74)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-5 lg:px-10">
          <Link className="flex min-w-0 items-center gap-3 sm:gap-4" href="/">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border-strong)] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_rgba(255,255,255,0.04)_62%)] shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:h-12 sm:w-12">
              <span className="font-serif text-base tracking-[0.24em] text-[var(--color-accent-soft)] sm:text-lg">
                AH
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate font-serif text-lg text-[var(--color-text-primary)] sm:text-xl">
                {brand.name}
              </p>
              <p className="truncate text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-soft)] sm:text-[10px] sm:tracking-[0.36em]">
                {brand.eyebrow}
              </p>
            </div>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 text-sm text-[var(--color-text-soft)] lg:flex"
          >
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  className={`transition hover:text-[var(--color-text-primary)] ${
                    isActive ? "text-[var(--color-text-primary)]" : ""
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              className="hidden min-h-11 items-center rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--color-text-primary)] transition hover:border-[var(--color-border-strong)] hover:bg-white/6 sm:inline-flex"
              href="/shop"
            >
              Browse references
            </Link>
            <Link
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-[var(--color-background)] transition duration-300 hover:scale-[1.02] hover:bg-[var(--color-accent-strong)] sm:min-h-11 sm:gap-3 sm:px-5 sm:py-3"
              href="/checkout"
              id="site-bag-target"
            >
              Bag
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-black/20 px-1 text-xs">
                {count}
              </span>
            </Link>
          </div>
        </div>

        <div className="border-t border-white/6 px-4 py-3 lg:hidden">
          <nav
            aria-label="Mobile primary"
            className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1"
          >
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  className={`inline-flex min-h-10 shrink-0 items-center rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] transition ${
                    isActive
                      ? "border-[var(--color-border-strong)] bg-[rgba(255,248,237,0.08)] text-[var(--color-text-primary)]"
                      : "border-white/10 text-[var(--color-text-soft)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
