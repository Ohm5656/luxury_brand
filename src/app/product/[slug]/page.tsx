import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Lift, Reveal } from "@/components/luxury-motion";
import { ProductCard } from "@/components/product-card";
import {
  formatPrice,
  getProductBySlug,
  getRelatedProducts,
  watchProducts,
} from "@/lib/store-data";

export function generateStaticParams() {
  return watchProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.slug, 3);
  const flightSourceId = `flight-source-${product.slug}-detail`;

  return (
    <main id="main-content" className="px-4 pb-24 pt-8 sm:px-6 lg:px-10 lg:pb-32 lg:pt-14">
      <div className="mx-auto max-w-7xl">
        <Link
          className="text-sm uppercase tracking-[0.28em] text-[var(--color-accent-soft)] transition hover:text-[var(--color-text-primary)]"
          href="/shop"
        >
          Back to catalog
        </Link>

        <section className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <Reveal className="grid gap-4 sm:gap-5">
            <div
              className="luxury-photo-frame relative aspect-[0.82] overflow-hidden rounded-[1.55rem] border border-white/10 sm:aspect-[0.9] sm:rounded-[2rem]"
              id={flightSourceId}
            >
              <Image
                alt={product.headline}
                className="object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                src={product.gallery[0]}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {product.gallery.slice(1).map((image, index) => (
                <Lift key={image}>
                  <div className="luxury-photo-frame relative aspect-[1.18] overflow-hidden rounded-[1.3rem] border border-white/10 sm:aspect-[1.05] sm:rounded-[1.6rem]">
                    <Image
                      alt={`${product.name} gallery image ${index + 2}`}
                      className="object-cover"
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      src={image}
                    />
                  </div>
                </Lift>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="luxury-panel luxury-grid rounded-[1.7rem] p-5 sm:rounded-[2rem] sm:p-7 lg:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[var(--color-border-strong)] bg-black/15 px-3 py-1 text-xs uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">
                {product.badge}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-[var(--color-text-soft)]">
                {product.collection}
              </span>
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-[0.94] text-[var(--color-text-primary)] sm:mt-6 sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-lg text-[var(--color-accent-soft)] sm:mt-4 sm:text-xl">
              {formatPrice(product.price, product.currency)}
            </p>
            <p className="mt-5 text-[0.95rem] leading-7 text-[var(--color-text-muted)] sm:mt-6 sm:text-base sm:leading-8">
              {product.headline}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
              {product.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <Tag>{product.category}</Tag>
              <Tag>{product.strap}</Tag>
              <Tag>{product.palette}</Tag>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton
                className="sm:flex-1"
                flightImageSrc={product.gallery[0]}
                flightSourceId={flightSourceId}
                slug={product.slug}
              />
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-border-strong)] hover:bg-white/6 sm:flex-1"
                href="/checkout"
              >
                Go to checkout
              </Link>
            </div>

            <div className="mt-7 grid gap-3 border-t border-white/10 pt-7 sm:mt-8 sm:gap-4 sm:pt-8">
              {product.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-[1.05rem] border border-white/10 bg-black/10 px-4 py-3 text-sm text-[var(--color-text-muted)] sm:rounded-[1.2rem]"
                >
                  {feature}
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-white/10 pt-7 sm:mt-8 sm:pt-8">
              <h2 className="font-serif text-2xl text-[var(--color-text-primary)] sm:text-3xl">
                Specifications
              </h2>
              <dl className="mt-5 grid gap-3 sm:gap-4">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid gap-1 rounded-[1.05rem] border border-white/10 bg-black/10 px-4 py-4 sm:grid-cols-[10rem_1fr] sm:items-center sm:rounded-[1.2rem]"
                  >
                    <dt className="text-xs uppercase tracking-[0.26em] text-[var(--color-text-soft)]">
                      {spec.label}
                    </dt>
                    <dd className="text-sm text-[var(--color-text-primary)]">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </section>

        <section className="mt-16 sm:mt-20">
          <Reveal>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent-strong)]">
                You may also like
              </p>
              <h2 className="mt-4 font-serif text-3xl text-[var(--color-text-primary)] sm:text-4xl">
                Related references
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-[var(--color-text-muted)]">
              Keep the browsing flow fluid with adjacent styles from the same collection or category.
            </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:gap-6 xl:grid-cols-3">
            {relatedProducts.map((related) => (
              <ProductCard key={related.slug} product={related} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--color-text-soft)]">
      {children}
    </span>
  );
}
