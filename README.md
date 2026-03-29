# Aureline Horology

A premium luxury watch storefront built with Next.js, React, Tailwind CSS, and Framer Motion.

This project was designed as a high-end editorial commerce experience rather than a generic catalog. The interface focuses on luxury typography, cinematic imagery, polished motion, and mobile-first layouts while still supporting a practical storefront flow.

## Highlights

- Luxury landing page with animated hero stats and editorial sections
- Product catalog with search, category filters, strap filters, and sorting
- Product detail pages with gallery, specifications, and related references
- Cart and checkout flow with persistent local storage state
- Checkout confirmation route and mock order API
- Responsive layouts tuned for mobile, tablet, and desktop
- Performance-conscious React patterns inspired by Vercel best practices

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Project Structure

```text
src/
  app/
    api/checkout/           Mock checkout endpoint
    checkout/               Checkout and success pages
    product/[slug]/         Product detail pages
    shop/                   Product catalog page
  components/
    cart-provider.tsx       Cart state and persistence
    checkout-form.tsx       Checkout UX
    hero-stats.tsx          Animated luxury stat counters
    product-card.tsx        Shared product card UI
    site-header.tsx         Global navigation
    watch-storefront.tsx    Home page experience
  lib/
    store-data.ts           Catalog, brand, and formatting helpers
```

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the app.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Current Storefront Behavior

- Cart state is stored in `localStorage`
- Checkout submits to a mock API route at `/api/checkout`
- Orders generate a confirmation number and redirect to a success page
- Product content is currently powered by local mock data

## Next Steps

- Connect to a real CMS or database for catalog management
- Add payment integration such as Stripe
- Add admin tools for inventory and merchandising
- Add authentication or VIP client accounts

## Design Direction

The visual direction is inspired by luxury retail, editorial layouts, and premium watch campaign sites:

- deep obsidian surfaces
- champagne and ivory accents
- serif-led display typography
- restrained but expressive motion
- tactile glass panels and photo framing

## Verification

The project has been validated with:

```bash
npm run build
npm run lint
```
