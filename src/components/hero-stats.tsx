"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

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
  const cardRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.55 });
  const count = useMotionValue(0);
  const smoothCount = useSpring(count, {
    stiffness: 82,
    damping: 24,
    mass: 0.9,
  });
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
      }),
    [],
  );
  const finalValueLabel = formatter.format(value);

  useMotionValueEvent(smoothCount, "change", (latest) => {
    if (!valueRef.current || shouldReduceMotion) {
      return;
    }

    valueRef.current.textContent = formatter.format(Math.round(latest));
  });

  useEffect(() => {
    if (!valueRef.current) {
      return;
    }

    if (!inView) {
      valueRef.current.textContent = formatter.format(0);
      return;
    }

    if (shouldReduceMotion) {
      valueRef.current.textContent = finalValueLabel;
      return;
    }

    const controls = animate(count, value, {
      delay,
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => {
      controls.stop();
    };
  }, [count, delay, finalValueLabel, formatter, inView, shouldReduceMotion, value]);

  return (
    <motion.div
      ref={cardRef}
      className="luxury-panel luxury-shimmer rounded-[1.35rem] p-4 sm:p-5"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="luxury-numeric font-serif text-[2rem] leading-none text-[var(--color-text-primary)] sm:text-[2.55rem]">
        {prefix ? <span className="opacity-95">{prefix}</span> : null}
        <span
          ref={valueRef}
          className="inline-block align-baseline"
          style={{ minWidth: `${finalValueLabel.length + 0.35}ch` }}
        >
          0
        </span>
        {suffix ? <span className="opacity-95">{suffix}</span> : null}
      </p>
      <p className="mt-3 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-text-soft)] sm:text-xs sm:tracking-[0.24em]">
        {label}
      </p>
    </motion.div>
  );
}
