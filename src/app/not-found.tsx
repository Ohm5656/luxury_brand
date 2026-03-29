import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="px-6 pb-24 pt-14 lg:px-10 lg:pb-32">
      <div className="mx-auto max-w-4xl">
        <section className="luxury-panel luxury-grid rounded-[2.2rem] p-8 text-center lg:p-12">
          <p className="text-xs uppercase tracking-[0.42em] text-[var(--color-accent-soft)]">
            Not found
          </p>
          <h1 className="mt-5 font-serif text-5xl text-[var(--color-text-primary)] sm:text-6xl">
            This reference is no longer in the salon.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-text-muted)]">
            Return to the catalog to continue browsing the available luxury timepieces.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-7 py-4 text-sm font-semibold text-[var(--color-background)] transition duration-300 hover:scale-[1.02] hover:bg-[var(--color-accent-strong)]"
              href="/shop"
            >
              Browse the catalog
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
