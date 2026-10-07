# Kiva Impact Plan Concept

An unofficial, interactive product demo for Kiva product managers. It explores one proposed feature: a single plan for how involved a lender wants to be, what they want to support, and what should happen when money comes back. It is independent, not produced or endorsed by Kiva, and does not move real money.

## Current scope

The October 6, 2026 scope change replaces the original lender-site recreation. Do not continue the historical milestone roadmap.

- `/` provides minimal context and a “Set my plan” entry point.
- `/impact-plan` contains a three-step wizard and its completed result: an illustrative $25 lifecycle, compact plan summary, Edit plan, and Reset demo.
- Completed anonymous choices persist in local storage. No account, payment, database, API, recommendation algorithm, or marketplace is involved.
- Legacy review, My Impact, and About URLs redirect into the current experience rather than creating additional product surfaces.

The target is comprehension in under 30 seconds and completion in under one minute. `AGENTS.md` and `PRD.md` define the current scope. Other documents retain useful product history and visual guidance, but their older full-site, four-step, and five-route requirements are superseded. `IMPLEMENTATION_PLAN.md` is a historical record. `CHATGPT_HANDOFF.md` summarizes the current reduced implementation and includes Cursor publishing instructions. See `BUILD_LOG.md` for actual implementation and verification status.

## Foundation

Next.js 16.2.9 App Router, React 19.2.4, strict TypeScript 5.9.3, and Tailwind 4.2.1. The existing Kiva-inspired colors, serif headings, sans serif body text, and reusable cards/buttons are retained. Dependency versions reflect the available cached installation; this scope change does not upgrade the stack.

Reference screenshots are never application assets and must not be published as page content.

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Normal builds use Inter and Lora through `next/font`, downloading font files at build time and serving them locally. Earlier restricted-environment builds could not resolve Google fonts. If downloads are unavailable, explicitly use the existing Georgia/Arial fallback:

```bash
KIVA_OFFLINE_FONTS=1 npm run dev -- --webpack
KIVA_OFFLINE_FONTS=1 npm run build
npm run start
```

Use the normal build when font downloads are available. The fallback changes typography and does not prove the intended fonts were verified.

## Required checks

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Formatting and browser tooling are also available through `npm run format:check` and `npm run test:e2e`. Playwright needs Chromium and permission to start a local server. Manually verify desktop/mobile, keyboard completion, refresh, editing, and reset when the environment permits. Prior local-server and browser restrictions are recorded in `BUILD_LOG.md`; current check results must be recorded separately.

The source repository is `https://github.com/Sambhav255/kiva-demo`. No production application URL is recorded.
