"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { ProductCard } from "@/components/product-card";
import { QuantityStepper } from "@/components/quantity-stepper";
import { useCart, useSuggestedProducts } from "@/components/cart-provider";
import { Reveal } from "@/components/luxury-motion";
import { formatPrice } from "@/lib/store-data";

type CheckoutState = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  note: string;
};

const initialState: CheckoutState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "Thailand",
  note: "",
};

export function CheckoutForm() {
  const router = useRouter();
  const { lines, subtotal, subtotalLabel, removeItem, updateQuantity, clearCart } = useCart();
  const suggestions = useSuggestedProducts(3);
  const [form, setForm] = useState<CheckoutState>(initialState);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const shipping = lines.length > 0 ? 180 : 0;
  const duties = lines.length > 0 ? Math.round(subtotal * 0.06) : 0;
  const grandTotal = subtotal + shipping + duties;

  const summary = useMemo(
    () => ({
      shippingLabel: formatPrice(shipping, "USD"),
      dutiesLabel: formatPrice(duties, "USD"),
      grandLabel: formatPrice(grandTotal, "USD"),
    }),
    [duties, grandTotal, shipping],
  );

  async function submitOrder() {
    setError("");

    if (lines.length === 0) {
      setError("Please add at least one watch to continue.");
      return;
    }

    if (!form.fullName || !form.email || !form.address || !form.city || !form.country) {
      setError("Please complete the required delivery details.");
      return;
    }

    startTransition(async () => {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form,
          items: lines,
          totals: {
            subtotal,
            shipping,
            duties,
            grandTotal,
          },
        }),
      });

      if (!response.ok) {
        setError("The salon could not confirm your order. Please try again.");
        return;
      }

      const payload = (await response.json()) as { orderId: string };
      clearCart();
      router.push(`/checkout/success/${payload.orderId}`);
    });
  }

  return (
    <main id="main-content" className="px-4 pb-24 pt-8 sm:px-6 lg:px-10 lg:pb-32 lg:pt-14">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent-strong)]">
            Checkout
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[0.94] text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            A private-client checkout flow with a clean path to confirm the order.
          </h1>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-7 text-[var(--color-text-muted)] sm:text-base sm:leading-8">
            Quantity changes, totals, and delivery details stay in one polished flow so the luxury mood remains intact right up to confirmation.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 xl:mt-10 xl:grid-cols-[1.05fr_0.95fr] xl:gap-8">
          <Reveal>
            <section className="luxury-panel rounded-[1.7rem] p-4 sm:rounded-[2rem] sm:p-6 lg:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <h2 className="font-serif text-2xl text-[var(--color-text-primary)] sm:text-3xl">
                Collection bag
              </h2>
              <Link
                className="text-sm uppercase tracking-[0.24em] text-[var(--color-accent-soft)] transition hover:text-[var(--color-text-primary)]"
                href="/shop"
              >
                Continue shopping
              </Link>
            </div>

            {lines.length === 0 ? (
              <div className="mt-6 rounded-[1.3rem] border border-white/10 bg-black/10 p-5 sm:mt-8 sm:rounded-[1.5rem] sm:p-6">
                <p className="font-serif text-2xl text-[var(--color-text-primary)]">
                  Your bag is empty
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                  Start with one of the curated references below and come back here to complete the order.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:mt-8">
                {lines.map((line) => (
                  <article
                    key={line.slug}
                    className="grid gap-4 rounded-[1.35rem] border border-white/10 bg-black/10 p-4 sm:grid-cols-[6rem_1fr_auto] sm:rounded-[1.5rem]"
                  >
                    <div className="luxury-photo-frame relative aspect-[1.05] overflow-hidden rounded-[1.05rem] border border-white/10 sm:rounded-[1.2rem]">
                      <Image
                        alt={line.name}
                        className="object-cover"
                        fill
                        sizes="96px"
                        src={line.image}
                      />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-text-soft)]">
                        {line.collection}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl text-[var(--color-text-primary)]">
                        {line.name}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                        {line.priceLabel}
                      </p>
                      <button
                        type="button"
                        className="mt-4 text-sm text-[var(--color-accent-soft)] transition hover:text-[var(--color-text-primary)]"
                        onClick={() => removeItem(line.slug)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex flex-col items-start justify-between gap-4 sm:items-end">
                      <QuantityStepper
                        quantity={line.quantity}
                        onDecrease={() => updateQuantity(line.slug, line.quantity - 1)}
                        onIncrease={() => updateQuantity(line.slug, line.quantity + 1)}
                      />
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                        {formatPrice(line.price * line.quantity, "USD")}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {suggestions.length > 0 ? (
              <div className="mt-10 sm:mt-12">
                <h3 className="font-serif text-2xl text-[var(--color-text-primary)] sm:text-3xl">
                  Suggested additions
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6">

                  {suggestions.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </div>
            ) : null}
          </section>
          </Reveal>

          <Reveal delay={0.08} className="grid gap-6">
            <div className="luxury-panel rounded-[1.7rem] p-4 sm:rounded-[2rem] sm:p-6 lg:p-8">
              <h2 className="font-serif text-2xl text-[var(--color-text-primary)] sm:text-3xl">
                Delivery details
              </h2>
              <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
                <Field
                  label="Full name"
                  required
                  value={form.fullName}
                  onChange={(value) => setForm((current) => ({ ...current, fullName: value }))}
                />
                <Field
                  label="Email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(value) => setForm((current) => ({ ...current, email: value }))}
                />
                <Field
                  label="Phone"
                  value={form.phone}
                  onChange={(value) => setForm((current) => ({ ...current, phone: value }))}
                />
                <Field
                  label="City"
                  required
                  value={form.city}
                  onChange={(value) => setForm((current) => ({ ...current, city: value }))}
                />
                <Field
                  className="sm:col-span-2"
                  label="Address"
                  required
                  value={form.address}
                  onChange={(value) => setForm((current) => ({ ...current, address: value }))}
                />
                <Field
                  label="Country"
                  required
                  value={form.country}
                  onChange={(value) => setForm((current) => ({ ...current, country: value }))}
                />
                <Field
                  label="Special note"
                  value={form.note}
                  onChange={(value) => setForm((current) => ({ ...current, note: value }))}
                />
              </div>
            </div>

            <div className="luxury-panel rounded-[1.7rem] p-4 sm:rounded-[2rem] sm:p-6 lg:p-8">
              <h2 className="font-serif text-2xl text-[var(--color-text-primary)] sm:text-3xl">
                Order summary
              </h2>

              <div className="mt-5 grid gap-4 rounded-[1.3rem] border border-white/10 bg-black/10 p-4 sm:mt-6 sm:rounded-[1.5rem] sm:p-5">
                <SummaryRow label="Subtotal" value={subtotalLabel} />
                <SummaryRow label="Insured shipping" value={summary.shippingLabel} />
                <SummaryRow label="Duties & handling" value={summary.dutiesLabel} />
                <SummaryRow isTotal label="Grand total" value={summary.grandLabel} />
              </div>

              {error ? (
                <p className="mt-5 rounded-[1.2rem] border border-[rgba(255,111,97,0.25)] bg-[rgba(255,111,97,0.08)] px-4 py-3 text-sm text-[#ffb8b1]">
                  {error}
                </p>
              ) : null}

              <button
                type="button"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-4 text-sm font-semibold text-[var(--color-background)] transition duration-300 hover:scale-[1.01] hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isPending || lines.length === 0}
                onClick={submitOrder}
              >
                {isPending ? "Confirming order..." : "Confirm order"}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  required = false,
  type = "text",
  className = "",
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  type?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={`grid gap-2 text-sm text-[var(--color-text-soft)] ${className}`}>
      {label}
      <input
        className="min-h-12 rounded-[1.1rem] border border-white/10 bg-black/10 px-4 text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-border-strong)] sm:rounded-[1.2rem]"
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function SummaryRow({
  label,
  value,
  isTotal = false,
}: {
  label: string;
  value: string;
  isTotal?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={isTotal ? "font-serif text-xl text-[var(--color-text-primary)] sm:text-2xl" : "text-sm text-[var(--color-text-muted)]"}>
        {label}
      </span>
      <span className={isTotal ? "font-serif text-xl text-[var(--color-text-primary)] sm:text-2xl" : "text-sm text-[var(--color-text-primary)]"}>
        {value}
      </span>
    </div>
  );
}
