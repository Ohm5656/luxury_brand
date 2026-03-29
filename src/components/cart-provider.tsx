"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  cartStorageKey,
  formatPrice,
  getProductBySlug,
  watchProducts,
} from "@/lib/store-data";

type CartItem = {
  slug: string;
  quantity: number;
};

type CartLine = {
  slug: string;
  quantity: number;
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  collection: string;
};

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  subtotalLabel: string;
  addItem: (slug: string, quantity?: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(cartStorageKey);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as {
      version?: number;
      items?: Array<{ slug?: string; quantity?: number }>;
    };

    if (parsed.version !== 1 || !Array.isArray(parsed.items)) {
      return [];
    }

    return parsed.items
      .filter((item) => typeof item.slug === "string" && typeof item.quantity === "number")
      .map((item) => ({
        slug: item.slug!,
        quantity: Math.max(1, Math.min(10, Math.floor(item.quantity!))),
      }))
      .filter((item) => Boolean(getProductBySlug(item.slug)));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readCartFromStorage());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      cartStorageKey,
      JSON.stringify({
        version: 1,
        items,
      }),
    );
  }, [items]);

  const lines = useMemo<CartLine[]>(() => {
    return items.flatMap((item) => {
      const product = getProductBySlug(item.slug);

      if (!product) {
        return [];
      }

      return [
        {
          slug: item.slug,
          quantity: item.quantity,
          name: product.name,
          price: product.price,
          priceLabel: formatPrice(product.price, product.currency),
          image: product.heroImage,
          collection: product.collection,
        },
      ];
    });
  }, [items]);

  const count = useMemo(
    () => lines.reduce((total, line) => total + line.quantity, 0),
    [lines],
  );
  const subtotal = useMemo(
    () => lines.reduce((total, line) => total + line.price * line.quantity, 0),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      lines,
      count,
      subtotal,
      subtotalLabel: formatPrice(subtotal, "USD"),
      addItem: (slug, quantity = 1) => {
        startTransition(() => {
          setItems((current) => {
            const existing = current.find((item) => item.slug === slug);

            if (!existing) {
              return [...current, { slug, quantity: Math.max(1, Math.min(10, quantity)) }];
            }

            return current.map((item) =>
              item.slug === slug
                ? {
                    ...item,
                    quantity: Math.max(1, Math.min(10, item.quantity + quantity)),
                  }
                : item,
            );
          });
        });
      },
      updateQuantity: (slug, quantity) => {
        startTransition(() => {
          setItems((current) =>
            current.flatMap((item) => {
              if (item.slug !== slug) {
                return [item];
              }

              if (quantity <= 0) {
                return [];
              }

              return [{ ...item, quantity: Math.max(1, Math.min(10, quantity)) }];
            }),
          );
        });
      },
      removeItem: (slug) => {
        startTransition(() => {
          setItems((current) => current.filter((item) => item.slug !== slug));
        });
      },
      clearCart: () => {
        startTransition(() => {
          setItems([]);
        });
      },
    }),
    [count, items, lines, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

export function useSuggestedProducts(limit = 3) {
  const { items } = useCart();

  return useMemo(() => {
    const current = new Set(items.map((item) => item.slug));

    return watchProducts.filter((product) => !current.has(product.slug)).slice(0, limit);
  }, [items, limit]);
}
