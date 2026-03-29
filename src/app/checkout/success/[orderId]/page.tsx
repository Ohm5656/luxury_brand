import Link from "next/link";

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return (
    <main id="main-content" className="px-6 pb-24 pt-10 lg:px-10 lg:pb-32 lg:pt-16">
      <div className="mx-auto max-w-4xl">
        <section className="luxury-panel luxury-grid rounded-[2.2rem] p-8 text-center lg:p-12">
          <p className="text-xs uppercase tracking-[0.42em] text-[var(--color-accent-soft)]">
            Order confirmed
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-[0.94] text-[var(--color-text-primary)] sm:text-6xl">
            Your private order has been received.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--color-text-muted)]">
            Reference number <span className="text-[var(--color-text-primary)]">{orderId}</span>.
            Our concierge will follow up with availability, delivery timing, and insured shipment details.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-7 py-4 text-sm font-semibold text-[var(--color-background)] transition duration-300 hover:scale-[1.02] hover:bg-[var(--color-accent-strong)]"
              href="/shop"
            >
              Continue browsing
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 px-7 py-4 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-border-strong)] hover:bg-white/6"
              href="/"
            >
              Return home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
