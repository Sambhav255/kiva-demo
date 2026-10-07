# Instructions for Codex

You are building Kiva Impact Plan, an unofficial interactive feature concept for Kiva product managers.

## Current scope and document precedence

The October 6, 2026 scope change supersedes the original lender-site recreation and milestone roadmap. Do not continue `IMPLEMENTATION_PLAN.md` as written. Read all project markdown before architectural decisions, but follow the latest user request and the current `PRD.md` for product scope. Earlier route, navigation, dashboard, borrower-fixture, and four-step requirements in other documents are historical context, not requirements for this demo.

The product hypothesis is that one understandable plan could help lenders connect participation, preferences, funding, and repayment decisions. This is a hypothesis for discussion, not a validated claim about Kiva users.

## Required experience

* `/`: minimal Kiva-inspired context, an Unofficial concept indicator, one sentence explaining the concept, and a card titled “Set your Impact Plan.” Use “Decide how involved you want to be and what should happen when money comes back.” and a “Set my plan” link.
* `/impact-plan`: a compact three-step wizard for participation, preferences, and money behavior, followed by its result on the same route.
* The result must show a dynamic visual lifecycle for an illustrative $25, a compact Your Impact Plan summary, Edit plan, and Reset demo.
* Persist only the completed anonymous plan in browser local storage. Refresh restores the result; reset removes only this demo's own state.
* Prevent manual borrower selection plus automatic relending. Explain automatic selection with balance or new-match repayment behavior so control over returned money stays clear.
* Legacy `/impact-plan/review`, `/my-impact`, and `/about` routes may redirect to the current experience. They are not separate product surfaces.

A PM should understand the concept in under 30 seconds and complete it in under one minute.

## Hard scope rules

Do not build a marketplace, borrower detail pages, checkout, full My Impact dashboard, account settings, teams, messages, donations, Giving Funds, a large About page, full Kiva navigation, or a full footer. Do not build recommendation algorithms, a real Kiva API integration, authentication, payment flows, a database, AI chat, or unrelated features.

Do not connect to a real Kiva account, move money, submit data to Kiva, scrape Kiva pages, depend on undocumented APIs, or imply Kiva affiliation. Do not request credentials or personal information. Do not imply guaranteed repayment, guaranteed impact, financial return, or tax outcomes.

## Visual and engineering rules

Preserve the existing Next.js App Router, strict TypeScript, Tailwind foundation, and useful visual tokens. Use white and pale green backgrounds, forest green, serif display headings, sans serif body copy, rounded white cards, green primary buttons, soft borders, restrained shadows, and generous whitespace.

Use screenshots only as visual references; never ship them as app content. Keep components small, accessible, and reusable. Use native radio/checkbox semantics, labelled fields, visible focus, understandable selected states, and usable touch targets. Keep state local to the browser and handle invalid or unavailable storage gracefully. Do not add global state libraries or backend services for this flow.

The latest request's exact copy and six-cause subset supersede conflicting text in `CONTENT_COPY.md` and `UI_SPEC.md`.

## Build discipline and completion

Run `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` after implementation. Manually verify the main flow at desktop and mobile widths when the environment permits; report blocked checks honestly.

Update `BUILD_LOG.md` with what was built, intentional scope changes, known issues, actual check results, and a deployment URL only if one exists. Do not expand the demo beyond the reduced scope for additional polish.
