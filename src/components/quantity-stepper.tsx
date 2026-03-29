"use client";

export function QuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-black/10 p-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="grid h-10 w-10 place-items-center rounded-full text-lg text-[var(--color-text-primary)] transition hover:bg-white/6"
        onClick={onDecrease}
      >
        -
      </button>
      <span className="min-w-12 text-center text-sm font-semibold text-[var(--color-text-primary)]">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="grid h-10 w-10 place-items-center rounded-full text-lg text-[var(--color-text-primary)] transition hover:bg-white/6"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
}
