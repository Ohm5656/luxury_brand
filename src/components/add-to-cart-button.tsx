"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useCart } from "@/components/cart-provider";
import { animateCartFlight } from "@/lib/cart-flight";

export function AddToCartButton({
  slug,
  label = "Add to collection bag",
  quantity = 1,
  flightImageSrc,
  flightSourceId,
  className = "",
}: {
  slug: string;
  label?: string;
  quantity?: number;
  flightImageSrc?: string;
  flightSourceId?: string;
  className?: string;
}) {
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();
  const [didAdd, setDidAdd] = useState(false);
  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-background)] transition duration-300 hover:scale-[1.02] hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      disabled={isPending}
      onClick={(event) => {
        animateCartFlight({
          imageSrc: flightImageSrc,
          launchElement: event.currentTarget,
          sourceElementId: flightSourceId,
        });

        startTransition(() => {
          addItem(slug, quantity);
          setDidAdd(true);

          if (resetTimeoutRef.current !== null) {
            window.clearTimeout(resetTimeoutRef.current);
          }

          resetTimeoutRef.current = window.setTimeout(() => {
            setDidAdd(false);
            resetTimeoutRef.current = null;
          }, 1800);
        });
      }}
    >
      {isPending ? "Adding..." : didAdd ? "Added to bag" : label}
    </button>
  );
}
