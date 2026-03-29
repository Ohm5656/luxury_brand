"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type HeroStat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
};

export function HeroStats({ items }: { items: HeroStat[] }) {
  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
      {items.map((item, index) => (
        <AnimatedStatCard
          key={item.label}
          delay={0.08 * index}
          label={item.label}
          prefix={item.prefix}
          suffix={item.suffix}
          value={item.value}
        />
      ))}
    </div>
  );
}

function AnimatedStatCard({
  label,
  value,
  prefix = "",
  suffix = "",
  delay,
}: HeroStat & { delay: number }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    if (shouldReduceMotion) {
      return;
    }

    let frame = 0;
    let startTime: number | null = null;

    const duration = 1400;
    const startValue = 0;

    const tick = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(startValue + (value - startValue) * eased);

      setDisplayValue(nextValue);

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const timeout = window.setTimeout(() => {
      frame = window.requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [delay, inView, shouldReduceMotion, value]);

  const renderedValue = shouldReduceMotion && inView ? value : displayValue;

  return (
    <motion.div
      ref={ref}
      className="luxury-panel luxury-shimmer rounded-[1.35rem] p-4 sm:p-5"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="luxury-numeric font-serif text-[2rem] leading-none text-[var(--color-text-primary)] sm:text-[2.55rem]">
        {prefix}
        {formatAnimatedNumber(renderedValue)}
        {suffix}
      </p>
      <p className="mt-3 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-text-soft)] sm:text-xs sm:tracking-[0.24em]">
        {label}
      </p>
    </motion.div>
  );
}

function formatAnimatedNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}
