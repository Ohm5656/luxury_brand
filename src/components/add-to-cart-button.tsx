"use client";

import { useState, useTransition } from "react";
import { useCart } from "@/components/cart-provider";

export function AddToCartButton({
  slug,
  label = "Add to collection bag",
  quantity = 1,
  className = "",
}: {
  slug: string;
  label?: string;
  quantity?: number;
  className?: string;
}) {
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();
  const [didAdd, setDidAdd] = useState(false);

  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-background)] transition duration-300 hover:scale-[1.02] hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          addItem(slug, quantity);
          setDidAdd(true);
          window.setTimeout(() => {
            setDidAdd(false);
          }, 1800);
        });
      }}
    >
      {isPending ? "Adding..." : didAdd ? "Added to bag" : label}
    </button>
  );
}
