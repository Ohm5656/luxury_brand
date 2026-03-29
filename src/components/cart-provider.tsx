"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
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
const cartStoreEvent = "aureline-cart-change";
const emptyCartItems: CartItem[] = [];

let currentCartItems: CartItem[] = emptyCartItems;
let hasHydratedFromStorage = false;

function emitCartChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(cartStoreEvent));
}

function sanitizeCartItems(items: Array<{ slug?: string; quantity?: number }>) {
  return items
    .filter((item) => typeof item.slug === "string" && typeof item.quantity === "number")
    .map((item) => ({
      slug: item.slug!,
      quantity: Math.max(1, Math.min(10, Math.floor(item.quantity!))),
    }))
    .filter((item) => Boolean(getProductBySlug(item.slug)));
}

function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") {
    return emptyCartItems;
  }

  try {
    const raw = window.localStorage.getItem(cartStorageKey);

    if (!raw) {
      return emptyCartItems;
    }

    const parsed = JSON.parse(raw) as {
      version?: number;
      items?: Array<{ slug?: string; quantity?: number }>;
    };

    if (parsed.version !== 1 || !Array.isArray(parsed.items)) {
      return emptyCartItems;
    }

    const sanitized = sanitizeCartItems(parsed.items);
    return sanitized.length > 0 ? sanitized : emptyCartItems;
  } catch {
    return emptyCartItems;
  }
}

function writeCartToStorage(items: CartItem[]) {
  currentCartItems = items.length > 0 ? items : emptyCartItems;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      cartStorageKey,
      JSON.stringify({
        version: 1,
        items: currentCartItems,
      }),
    );
  }

  emitCartChange();
}

function getCartSnapshot() {
  return currentCartItems;
}

function getCartServerSnapshot() {
  return emptyCartItems;
}

function syncCartStoreFromStorage() {
  const nextItems = readCartFromStorage();

  if (nextItems === currentCartItems) {
    return;
  }

  const sameLength = nextItems.length === currentCartItems.length;
  const sameEntries =
    sameLength &&
    nextItems.every(
      (item, index) =>
        item.slug === currentCartItems[index]?.slug &&
        item.quantity === currentCartItems[index]?.quantity,
    );

  if (sameEntries) {
    return;
  }

  currentCartItems = nextItems;
  emitCartChange();
}

function subscribeToCartStore(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => {
    syncCartStoreFromStorage();
    onStoreChange();
  };

  window.addEventListener("storage", handleChange);
  window.addEventListener(cartStoreEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(cartStoreEvent, onStoreChange);
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(
    subscribeToCartStore,
    getCartSnapshot,
    getCartServerSnapshot,
  );

  useEffect(() => {
    if (hasHydratedFromStorage) {
      return;
    }

    hasHydratedFromStorage = true;
    syncCartStoreFromStorage();
  }, []);

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
          const existing = items.find((item) => item.slug === slug);

          if (!existing) {
            writeCartToStorage([
              ...items,
              { slug, quantity: Math.max(1, Math.min(10, quantity)) },
            ]);
            return;
          }

          writeCartToStorage(
            items.map((item) =>
              item.slug === slug
                ? {
                    ...item,
                    quantity: Math.max(1, Math.min(10, item.quantity + quantity)),
                  }
                : item,
            ),
          );
        });
      },
      updateQuantity: (slug, quantity) => {
        startTransition(() => {
          writeCartToStorage(
            items.flatMap((item) => {
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
          writeCartToStorage(items.filter((item) => item.slug !== slug));
        });
      },
      clearCart: () => {
        startTransition(() => {
          writeCartToStorage(emptyCartItems);
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
