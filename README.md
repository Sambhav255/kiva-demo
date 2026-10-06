# Kiva Impact Plan Concept

This folder contains the complete product and implementation brief for an unofficial concept prototype called Kiva Impact Plan.

The prototype is intended to demonstrate product thinking to Kiva product leaders. It is not a production integration, does not move money, does not authenticate against Kiva, and must never imply that Kiva has approved or endorsed it.

## What to build

Build a small, polished web prototype that shows how a lender could define one clear plan for how money should move through Kiva.

The prototype should answer four questions for the user:

* How involved do you want to be in choosing borrowers?
* What causes and borrower characteristics matter to you?
* How should money enter your Kiva account?
* What should happen when repayments return?

The final state should show a simple visual explanation of what happens to the next twenty five dollars and a compact Impact Plan card that can live inside the existing My Impact experience.

## Why this concept exists

The current lender product has several useful but separate mechanisms for controlling money and engagement:

* Manual lending
* Auto Deposit
* Auto Lending
* Monthly Good
* Repayment settings
* Inactivity settings
* Giving Funds
* Direct donations to Kiva

Each feature makes sense in isolation. The opportunity is to reduce the mental work required to understand how these systems relate to each other.

The concept is therefore not another recommendation engine and not a dashboard redesign. It is a decision and control layer that makes existing Kiva capabilities easier to understand and configure.

## Recommended reading order for Codex

1. `AGENTS.md`
2. `PROJECT_CONTEXT.md`
3. `PRD.md`
4. `UI_SPEC.md`
5. `CONTENT_COPY.md`
6. `TECH_STACK.md`
7. `ARCHITECTURE.md`
8. `IMPLEMENTATION_PLAN.md`
9. `QA_TEST_PLAN.md`
10. `DEPLOYMENT.md`
11. `DEMO_AND_OUTREACH.md`

## Screenshot references

The `screenshots` directory contains the live Kiva account surfaces captured on October 5, 2026. They are reference material for layout, visual rhythm, product terminology, and interaction patterns.

Do not publish the screenshots as site content. Do not ship them to the deployed site. Use them only as visual references while implementing the concept.

## Scope

The first version should contain only these user facing surfaces:

* A Kiva inspired My Impact home state with an entry point called Set your Impact Plan
* A four step Impact Plan setup flow
* A review screen with a money flow explanation
* A completed Impact Plan state inside My Impact
* A small About this concept page for PMs

Do not build checkout, real lending, authentication, payment handling, a database, or a live Kiva account connection.

## Definition of done

The concept is done when a PM can open a public URL, understand the product problem within thirty seconds, complete the flow in under two minutes, see the resulting plan, and understand how the concept could map onto Kiva's existing products.

## Local development

Milestones 0–2 currently provide the design foundation and new-lender home. Setup and review routes are placeholders for later milestones; completed-plan persistence and demo reset are not implemented yet. See `BUILD_LOG.md` for verification status and environment limitations.

Install and start:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. The default configuration downloads Inter and Lora at build time through `next/font`, then serves them locally. If Google font downloads are unavailable, use the explicit offline fallback:

```bash
KIVA_OFFLINE_FONTS=1 npm run dev -- --webpack
KIVA_OFFLINE_FONTS=1 npm run build
npm run start
```

Offline mode uses Georgia and Arial rather than the intended font pair. Normal network-enabled builds use `npm run build` without that option.

Run checks:

```bash
npm run typecheck
npm run lint
npm run test
npm run format:check
npm run build
npm run test:e2e
```

Playwright needs an installed Chromium browser (`npx playwright install chromium`) and permission to start a local server. Its current tests cover the home entry and responsive shell rather than the future complete setup flow. Manually verify the home and shell at desktop and mobile widths before considering Milestones 0–2 acceptance complete.
