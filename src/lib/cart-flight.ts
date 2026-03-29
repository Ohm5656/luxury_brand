type CartFlightOptions = {
  imageSrc?: string;
  launchElement?: HTMLElement | null;
  sourceElementId?: string;
};

const BAG_TARGET_ID = "site-bag-target";

function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pulseBagTarget(bagTarget: HTMLElement | null) {
  if (!bagTarget || typeof bagTarget.animate !== "function") {
    return;
  }

  bagTarget.animate(
    [
      { transform: "scale(1)", filter: "brightness(1)" },
      { transform: "scale(1.045)", filter: "brightness(1.06)" },
      { transform: "scale(1)", filter: "brightness(1)" },
    ],
    {
      duration: 620,
      easing: "cubic-bezier(0.2, 0.9, 0.24, 1)",
    },
  );
}

export function animateCartFlight({
  imageSrc,
  launchElement,
  sourceElementId,
}: CartFlightOptions) {
  if (typeof window === "undefined" || !imageSrc) {
    return;
  }

  const bagTarget = document.getElementById(BAG_TARGET_ID);
  const fallbackSourceElement = sourceElementId
    ? document.getElementById(sourceElementId)
    : null;
  const sourceElement = launchElement ?? fallbackSourceElement;

  if (!bagTarget) {
    return;
  }

  if (!sourceElement || prefersReducedMotion()) {
    pulseBagTarget(bagTarget);
    return;
  }

  const sourceRect = sourceElement.getBoundingClientRect();
  const bagRect = bagTarget.getBoundingClientRect();

  const startSize = launchElement
    ? Math.max(38, Math.min(sourceRect.height * 0.92, 54))
    : Math.max(52, Math.min(sourceRect.width * 0.34, 110));
  const endSize = Math.max(18, Math.min(bagRect.width * 0.24, 28));

  const startX = sourceRect.left + sourceRect.width / 2 - startSize / 2;
  const startY = sourceRect.top + sourceRect.height / 2 - startSize / 2;
  const endX = bagRect.left + bagRect.width / 2 - endSize / 2;
  const endY = bagRect.top + bagRect.height / 2 - endSize / 2;
  const midX = startX + (endX - startX) * 0.5;
  const midY = startY + (endY - startY) * 0.5;

  const ghost = document.createElement("img");
  ghost.src = imageSrc;
  ghost.alt = "";
  ghost.setAttribute("aria-hidden", "true");
  ghost.style.position = "fixed";
  ghost.style.left = "0";
  ghost.style.top = "0";
  ghost.style.width = `${startSize}px`;
  ghost.style.height = `${startSize}px`;
  ghost.style.objectFit = "cover";
  ghost.style.borderRadius = "20px";
  ghost.style.border = "1px solid rgba(255, 248, 237, 0.22)";
  ghost.style.boxShadow =
    "0 18px 48px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.18)";
  ghost.style.pointerEvents = "none";
  ghost.style.zIndex = "9999";
  ghost.style.willChange = "transform, opacity, filter";
  ghost.style.transform = `translate3d(${startX}px, ${startY}px, 0) scale(1) rotate(0deg)`;
  ghost.style.opacity = "0.98";
  ghost.style.filter = "saturate(1.04) brightness(1.02)";

  document.body.appendChild(ghost);

  const animation = ghost.animate(
    [
      {
        transform: `translate3d(${startX}px, ${startY + 10}px, 0) scale(0.62) rotate(-10deg)`,
        opacity: 0,
        filter: "saturate(1.1) brightness(1.08) blur(0px)",
      },
      {
        transform: `translate3d(${startX}px, ${startY}px, 0) scale(1) rotate(0deg)`,
        opacity: 0.98,
        filter: "saturate(1.04) brightness(1.02)",
        offset: 0.22,
      },
      {
        transform: `translate3d(${midX}px, ${midY}px, 0) scale(0.82) rotate(-5deg)`,
        opacity: 0.94,
        filter: "saturate(1.08) brightness(1.05)",
        offset: 0.68,
      },
      {
        transform: `translate3d(${endX}px, ${endY}px, 0) scale(${(endSize / startSize).toFixed(3)}) rotate(3deg)`,
        opacity: 0.14,
        filter: "saturate(0.96) brightness(0.98) blur(0.5px)",
      },
    ],
    {
      duration: 980,
      easing: "cubic-bezier(0.18, 0.94, 0.22, 1)",
      fill: "forwards",
    },
  );

  const glow = document.createElement("div");
  glow.setAttribute("aria-hidden", "true");
  glow.style.position = "fixed";
  glow.style.left = "0";
  glow.style.top = "0";
  glow.style.width = `${startSize * 0.8}px`;
  glow.style.height = `${startSize * 0.8}px`;
  glow.style.borderRadius = "999px";
  glow.style.pointerEvents = "none";
  glow.style.zIndex = "9998";
  glow.style.background =
    "radial-gradient(circle, rgba(217,183,124,0.34) 0%, rgba(217,183,124,0) 72%)";
  glow.style.transform = `translate3d(${startX}px, ${startY}px, 0)`;

  document.body.appendChild(glow);

  const glowAnimation = glow.animate(
    [
      {
        transform: `translate3d(${startX}px, ${startY + 12}px, 0) scale(0.52)`,
        opacity: 0,
      },
      {
        transform: `translate3d(${startX}px, ${startY}px, 0) scale(0.86)`,
        opacity: 0.22,
        offset: 0.22,
      },
      {
        transform: `translate3d(${midX}px, ${midY}px, 0) scale(0.76)`,
        opacity: 0.24,
        offset: 0.66,
      },
      {
        transform: `translate3d(${endX}px, ${endY}px, 0) scale(0.22)`,
        opacity: 0,
      },
    ],
    {
      duration: 980,
      easing: "cubic-bezier(0.18, 0.94, 0.22, 1)",
      fill: "forwards",
    },
  );

  animation.finished
    .catch(() => undefined)
    .finally(() => {
      ghost.remove();
      pulseBagTarget(bagTarget);
    });

  glowAnimation.finished
    .catch(() => undefined)
    .finally(() => {
      glow.remove();
    });
}
