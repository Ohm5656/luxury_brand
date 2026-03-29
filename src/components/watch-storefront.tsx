import Image from "next/image";
import Link from "next/link";
import { HeroStats } from "@/components/hero-stats";
import { Float, Lift, Reveal } from "@/components/luxury-motion";
import { ProductCard } from "@/components/product-card";
import {
  brand,
  editorialStories,
  featuredSlugs,
  watchCollections,
  watchProducts,
} from "@/lib/store-data";

const featuredProducts = watchProducts.filter((product) =>
  featuredSlugs.includes(product.slug as (typeof featuredSlugs)[number]),
);

export function WatchStorefront() {
  return (
    <main id="main-content" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,248,237,0.14),transparent_24%),radial-gradient(circle_at_top_right,_rgba(196,166,109,0.12),transparent_30%),radial-gradient(circle_at_center,_rgba(255,255,255,0.03),transparent_46%)]" />
      <Float
        className="pointer-events-none absolute -left-10 top-28 hidden h-36 w-36 rounded-full bg-[radial-gradient(circle,_rgba(217,183,124,0.22),rgba(217,183,124,0)_72%)] blur-3xl lg:block"
        duration={9}
        y={18}
      >
        <span />
      </Float>
      <Float
        className="pointer-events-none absolute right-0 top-[32rem] hidden h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(255,248,237,0.16),rgba(255,248,237,0)_72%)] blur-3xl lg:block"
        duration={11}
        y={20}
      >
        <span />
      </Float>

      <section className="px-4 pb-14 pt-8 sm:px-6 lg:px-10 lg:pb-28 lg:pt-16">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <Reveal className="max-w-2xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border-strong)] bg-[rgba(255,248,237,0.05)] px-4 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-[var(--color-accent-soft)] sm:text-xs sm:tracking-[0.34em]">
              Salon release 2026
            </div>
            <h1 className="mt-6 font-serif text-4xl leading-[0.94] text-[var(--color-text-primary)] sm:text-5xl lg:text-8xl">
              Watches curated like jewelry, sold like a private appointment.
            </h1>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
              {brand.description} The experience keeps the editorial luxury mood from the first screen through product detail, bag, and checkout.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--color-background)] transition duration-300 hover:scale-[1.02] hover:bg-[var(--color-accent-strong)]"
                href="/shop"
              >
                Explore the collection
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 px-6 py-3.5 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-border-strong)] hover:bg-white/6"
                href="/checkout"
              >
                Start private checkout
              </Link>
            </div>

            <HeroStats
              items={[
                { label: "References", value: watchProducts.length },
                { label: "Starting at", value: 8700, prefix: "$" },
                { label: "Concierge reply", value: 24, suffix: "h" },
              ]}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="luxury-panel luxury-grid overflow-hidden rounded-[1.7rem] p-3 sm:rounded-[2rem] sm:p-5 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
              <div className="grid gap-3 sm:gap-4 lg:grid-cols-[0.92fr_1.08fr]">
                <Lift className="luxury-photo-frame rounded-[1.35rem] sm:rounded-[1.6rem]">
                  <div className="relative aspect-[0.92] sm:aspect-[0.98] lg:min-h-[28rem]">
                    <Image
                      alt="Luxury watch editorial hero"
                      className="object-cover"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      src="https://images.pexels.com/photos/15997560/pexels-photo-15997560.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    />
                  </div>
                </Lift>

                <div className="grid gap-3 sm:gap-4">
                  <Float duration={8.5} y={8}>
                    <div className="luxury-photo-frame rounded-[1.35rem] sm:rounded-[1.6rem]">
                      <div className="relative aspect-[0.62] min-h-[11rem] sm:aspect-[1.25]">
                        <Image
                          alt="Blue chronograph on reflective surface"
                          className="object-cover"
                          fill
                          sizes="(max-width: 1024px) 100vw, 30vw"
                          src="https://images.pexels.com/photos/2799535/pexels-photo-2799535.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        />
                      </div>
                    </div>
                  </Float>
                  <div className="luxury-panel luxury-shimmer rounded-[1.35rem] p-5 sm:rounded-[1.6rem] sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-accent-soft)] sm:text-xs sm:tracking-[0.34em]">
                          Featured drop
                        </p>
                        <h2 className="mt-3 font-serif text-2xl leading-tight text-[var(--color-text-primary)] sm:text-3xl">
                          Mechanical theatre, styled with restraint.
                        </h2>
                      </div>
                      <div className="hidden rounded-full border border-[var(--color-border-strong)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-[var(--color-accent-soft)] sm:block">
                        New
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
                      Every section uses the same refined system: accessible contrast, precise motion, comfortable touch targets, and cinematic imagery with clear commerce actions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.36em] text-[var(--color-accent-strong)] sm:tracking-[0.42em]">
                  Collections
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
                  Three watch worlds designed for different kinds of presence.
                </h2>
              </div>
              <Link
                className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-soft)] transition hover:text-[var(--color-text-primary)] sm:tracking-[0.28em]"
                href="/shop"
              >
                View full catalog
              </Link>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-3 lg:gap-6">
            {watchCollections.map((collection, index) => (
              <Reveal key={collection.slug} delay={0.06 * index}>
                <Lift>
                  <article className="luxury-panel luxury-grid luxury-shimmer rounded-[1.55rem] p-5 sm:rounded-[1.8rem] sm:p-7">
                    <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[var(--color-accent-soft)] sm:text-xs sm:tracking-[0.32em]">
                      {collection.subtitle}
                    </p>
                    <h3 className="mt-4 font-serif text-2xl text-[var(--color-text-primary)] sm:mt-5 sm:text-3xl">
                      {collection.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)] sm:text-base sm:leading-8">
                      {collection.description}
                    </p>
                  </article>
                </Lift>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.36em] text-[var(--color-accent-strong)] sm:tracking-[0.42em]">
                  Featured references
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
                  Luxury product cards with real buy flow behind them.
                </h2>
              </div>
              <p className="max-w-lg text-sm leading-7 text-[var(--color-text-muted)]">
                Built with a full product route, bag state, and checkout path so the design stays premium without sacrificing utility.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 lg:mt-10 xl:grid-cols-3 xl:gap-6">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.slug} delay={0.06 * index}>
                <ProductCard priority={index === 0} product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2 lg:gap-6">
          {editorialStories.map((story, index) => (
            <Reveal key={story.title} delay={0.08 * index}>
              <Lift>
                <article className="luxury-panel overflow-hidden rounded-[1.65rem] sm:rounded-[2rem]">
                  <div className="luxury-photo-frame border-b border-white/10">
                    <div className="relative aspect-[1.12] sm:aspect-[1.24]">
                      <Image
                        alt={story.title}
                        className="object-cover"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        src={story.image}
                      />
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-serif text-2xl text-[var(--color-text-primary)] sm:text-3xl">
                      {story.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
                      {story.description}
                    </p>
                  </div>
                </article>
              </Lift>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
