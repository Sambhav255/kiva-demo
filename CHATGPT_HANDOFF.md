# Kiva Impact Plan — comprehensive project handoff

Prepared October 6, 2026, for the ChatGPT conversation that helped create the original product brief and implementation plan.

## 1. Read this first

The project now has a working source-code foundation for **Milestones 0 through 2** of `IMPLEMENTATION_PLAN.md`. It has been published to **https://github.com/Sambhav255/kiva-demo**, on `main`, through Cursor. The remote commit verified during this handoff process was `cc5c2081dc2ed880316dd38be27909afc684bd87`.

The full Impact Plan product flow is **not implemented yet**. The home page, common visual shell, local borrower examples, and engineering tooling exist. The setup and review pages are explicit placeholders. There is no saved plan, local-storage persistence, completed-plan account state, or reset control yet.

Type checking, linting, the existing unit tests, formatting, and an explicit offline-font production build passed during implementation. Desktop/mobile browser acceptance and the end-to-end tests were blocked by the execution environment. Do not treat those checks as passed. GitHub publication is complete; Vercel deployment is not.

This document is a factual handoff and continuation guide. It does not replace the original product requirements or authorize expanding the scope of a future coding task.

## 2. Why this project exists

**Product name:** Kiva Impact Plan.

**Product type:** An independent, unofficial concept prototype for Kiva's individual lender experience.

**Intended audience:** Kiva product leaders and other reviewers who can give feedback on the product hypothesis. The project is intended to demonstrate product judgment and provide a concrete artifact for discussion, rather than merely demonstrate a technical stack.

The original product inspection observed several useful mechanisms that affect money movement and engagement: manual lending, Auto Deposit, Auto Lending, Monthly Good, repayment settings, inactivity settings, Giving Funds, and direct donations to Kiva. The opportunity proposed in the brief is to help lenders understand how these mechanisms relate to one another.

The concept gives a lender one place to answer four questions:

1. How involved do I want to be in choosing borrowers?
2. What causes, locations, and borrower preferences matter to me?
3. How should money enter my account?
4. What should happen when repayments return?

The core hypothesis is that expressing these choices as one understandable money lifecycle could improve confidence in recurring participation while preserving control. This is a hypothesis, not a validated finding about Kiva users, and no retention improvement or reduction in confusion has been demonstrated.

The primary target is a new, lightly engaged, or returning individual lender without an established recurring routine. An existing lender wanting a clearer view of their settings is a secondary target.

The conceptual centerpiece is the **MoneyFlow** review: a lender should be able to predict what the next $25 would do and what happens after repayment. The concept should connect existing capabilities rather than replace Kiva's lending products, recommendation system, checkout, or full dashboard.

## 3. Source documents and how to use them

The implementation agent read the project documents before coding. Future agents should do the same and consult the actual code when assessing implementation status.

| Document | Purpose |
| --- | --- |
| `AGENTS.md` | Mandatory scope, engineering, accessibility, privacy, and build instructions. |
| `PROJECT_CONTEXT.md` | Product observations from the captured lender experience and the reasoning behind the concept. |
| `PRD.md` | User problem, hypothesis, target users, required experience, exclusions, and discovery questions. |
| `UI_SPEC.md` | Visual system, route layouts, controls, responsive behavior, and accessibility requirements. |
| `CONTENT_COPY.md` | Default interface language and disclaimers. |
| `TECH_STACK.md` | Stack recommendations and reasons; planned packages are not automatically installed packages. |
| `ARCHITECTURE.md` | Suggested normalized plan model, persistence, compatibility rules, provider boundary, and component responsibilities. |
| `IMPLEMENTATION_PLAN.md` | Milestones 0–12 with tasks and acceptance criteria. |
| `QA_TEST_PLAN.md` | Required unit, interaction, browser, accessibility, content, and production checks. |
| `DEPLOYMENT.md` | Vercel publishing approach, naming, disclaimers, and production checklist. |
| `DEMO_AND_OUTREACH.md` | Planned two-minute demo, research framing, and outreach guidance. |
| `README.md` | Project overview, reading order, local commands, and current preview scope. |
| `BUILD_LOG.md` | Implementation decisions, deviations, check results, environment blockers, and publishing history. |

The brief and UI specification remain the product source of truth. Some architecture details are suggestions that need a deliberate implementation choice. This handoff documents those choices where unresolved rather than presenting them as already settled.

## 4. What happened so far

### A. Brief, plan, and visual references existed before implementation

The original ChatGPT work produced the product context, PRD, UI specification, copy, technical and architecture recommendations, QA plan, deployment guidance, outreach guidance, and staged implementation plan. Captured Kiva screenshots dated October 5, 2026, were provided as visual reference material.

### B. The user authorized only Milestones 0–2 for the initial build

The request was to read `AGENTS.md` and every referenced document, understand context before coding, implement Milestones 0–2, use screenshots only as visual references, run required checks, and update `BUILD_LOG.md`.

The user also explicitly requested multiple agents to work faster. Parallel scope/accessibility and dependency reviews were used. The reviews did not report blockers; a definition-list ordering issue in the impact metrics was corrected, and dependency/lockfile consistency was checked.

### C. The foundation and home were implemented

The implementation created the Next.js application, shared design system and shell, home content, local loan-provider boundary, fictional borrower fixtures, safe demo interactions, and test/tool configuration. Extra required routes were scaffolded honestly, without pretending the later product flow was finished.

### D. Restricted execution affected installation and validation

Package registry and Google font access were unavailable from the coding environment. Cached dependency versions were used, and an explicit offline-font option was added. Local web servers failed to listen with `EPERM`, and headless Chromium encountered macOS bootstrap/Mach-port restrictions. As a result, browser acceptance could not be completed in that environment.

### E. Several GitHub publishing paths were attempted

The requested destination was initially `Sambhav255/kiva-demo`. A clean publication checkout was prepared under `/private/tmp/kiva-demo-publish`, excluding screenshots, dependencies, generated files, and environment files.

The GitHub connector could read the public repository, but write attempts returned HTTP 403, `Resource not accessible by integration`. Terminal Git and GitHub CLI attempts could not resolve GitHub from the managed environment. The CLI's “invalid token” message therefore did not conclusively establish that the user's token itself was invalid.

The user then requested a new repository named `kiva-impact-plan-concept`. It was created as a private repository through the signed-in GitHub browser session. Its upload did not complete: an initial file-upload permission request was dismissed, and a later attempt identified the ChatGPT browser extension's disabled “Allow access to file URLs” setting. Browser policy also prevented the agent from opening `brave://extensions` to change that setting. The separate repository was not used for the successful publication.

The user obtained a GitHub personal access token with a stated 90-day lifetime and discussed persistent authentication for future projects. No token value is included in this handoff, and no successful reusable CLI authentication was verified from the restricted agent session. Future access must be checked in the environment that will perform the work; do not assume a token alone resolves network or connector permission restrictions.

### F. Cursor successfully published to the original repository

The user reported that Cursor pushed the project to `https://github.com/Sambhav255/kiva-demo`. This was independently checked through the GitHub connector: `main` contained the application, configuration, tests, and product documents, with **52 files and no reference screenshots**.

The verified merge commit preserved the remote repository's initial history and retained the project README. The current local Git history includes the initial commit, the implementation commit, and the merge commit. Treat **`kiva-demo` as the canonical repository** for continuing work.

Local `BUILD_LOG.md` was subsequently updated to record the confirmed publication. This handoff document and the latest local log changes were not part of the verified remote snapshot. They need to be included in the material given to ChatGPT or pushed separately through a working publishing environment.

## 5. Current route-by-route behavior

| Route | What exists now | What still needs to be built |
| --- | --- | --- |
| `/` | New-lender home with shared navigation, concept badge, impact overview, three next-step cards, three illustrative loan cards, simplified lower content, and footer. | Saved-plan home variant and final browser/visual validation. |
| `/impact-plan` | Explicit later-milestone placeholder headed “Set your Impact Plan,” with navigation back to My Impact. | Real progress indicator, selections, validation, step navigation, and draft persistence. |
| `/impact-plan/review` | Explicit later-milestone review placeholder. | Dynamic MoneyFlow, summary, edit links, risk note, save behavior, and read-only completed-plan review. |
| `/my-impact` | Reuses the new-lender home. | Completed account state with saved plan, mode-specific next action, edit, and money-flow link. |
| `/about` | Interim problem statement, hypothesis, limits of evidence, scope explanation, disclaimer, and return link. | Full planned rationale/research sections and reset control once persistence exists. |

“Set plan” links to `/impact-plan`. It currently opens the setup preview rather than a usable wizard. The app cannot yet complete the two-minute demo described in `DEMO_AND_OUTREACH.md`.

Most surrounding Kiva-style navigation provides visual context. It does not recreate real account tools. Borrower buttons show **“Prototype only. No loan will be placed.”** through an accessible status message. They do not create loans, change a balance, or contact Kiva.

The home impact metrics and demo balance are zeroed illustrative values. The loan funding bars are decorative, currently fixed at 65%, rather than calculated from real or complete funding data. Search and other surrounding lending/navigation labels are presentation context; My teams, Messages, Settings, and Give do not implement their real-world actions.

## 6. Implemented engineering and visual foundation

### Stack actually installed

| Package/tool | Current version |
| --- | --- |
| Next.js | `16.2.9` |
| React / React DOM | `19.2.4` |
| TypeScript | `5.9.3`, strict mode |
| Tailwind / Tailwind PostCSS | `4.2.1` |
| Lucide React | `0.577.0` |
| ESLint / eslint-config-next | `9.39.2` / `16.2.4` |
| Prettier | `3.8.1` |
| Vitest | `3.2.4` |
| Playwright | `1.58.2` |

React Testing Library, jest-dom, jsdom, and Vite are configured. `package.json` contains exact versions and dependency overrides used to make the cached installation workable. React Hook Form, Zod, and the resolver package are recommended in the original stack document but **are not installed yet**; they were unnecessary for Milestones 0–2.

The build script uses `next build --webpack`. The stack document asked for current stable Next.js; the implementation used cached versions because network access prevented the intended installation. Reassess the framework and matching ESLint configuration with access to the package registry before proceeding. Do not treat the version identified during the earlier session as a permanently current recommendation.

### Visual system

The CSS establishes forest green navigation, pale green backgrounds, white rounded cards, restrained borders/shadows, generous spacing, serif display headings, and sans serif body text. Inter and Lora are configured through `next/font`. Responsive rules, visible focus treatments, a skip-to-content link, and reduced-motion handling are present in code.

These implementation features still require runtime inspection. The shell has not been proven free of mobile overflow, and accessibility has not received a complete browser audit.

Tailwind is enabled, but most visual styling currently uses authored semantic CSS in `app/globals.css`. Static pages and shell components use server components where practical; `LoanCard` is a client component for its local status notice. No analytics or backend data fetch is present.

### Main files

```text
app/
  layout.tsx                     Shared shell and noindex/nofollow metadata
  globals.css                    Design tokens, layouts, responsive/accessibility rules
  page.tsx                       New-lender home
  about/page.tsx                 Interim product rationale
  impact-plan/page.tsx           Setup placeholder
  impact-plan/review/page.tsx    Review placeholder
  my-impact/page.tsx             Home reuse; completed state pending

components/
  shell/                        GlobalNav, AccountNav, PrototypeBadge, Footer
  home/                         ImpactOverview, NextSteps
  common/                       Buttons, SurfaceCard, LoanCard, ConceptArt,
                                MilestonePlaceholder

data/loans.ts                   Three fictional loan examples
lib/loans/provider.ts           Current home-loan interface
lib/loans/static-provider.ts    Static implementation
lib/fonts.ts                   Inter/Lora
lib/fonts-offline.ts           Offline fallback
tests/                         Unit/component tests and home browser tests
```

`Buttons.tsx` contains the reusable primary/secondary button implementations; they are not separate files as suggested in the original architecture sketch. This is a small organizational difference, not missing behavior.

### Local fixture data and provider boundary

Three fictional examples are implemented:

| Example | Location | Causes | Illustrative amount remaining |
| --- | --- | --- | --- |
| A learning cooperative | Peru | Education, Entrepreneurs | $725 |
| A small farming group | Kenya | Agriculture, Food | $450 |
| A neighborhood maker | Philippines | Entrepreneurs, Arts | $875 |

These are not available Kiva loans or real borrower records. Artwork uses CSS treatments and generic icons rather than remote Kiva assets.

The current `LoanProvider` exposes a source label and `getHomeLoans(limit?)`. It supports the home page and handles limits without mutating fixtures. It **does not** implement the future `getRecommendedLoans(plan, limit?)` API, matching scores, match explanations, or automatic-mode matching counts. The broader fixture set of six to twelve records is also pending.

### Persistence and forms

There is no implemented `ImpactPlan` schema, storage adapter, setup draft, completed plan, compatibility function, form wizard, or reset logic. `ARCHITECTURE.md` describes these future structures. Do not confuse that design with existing code.

## 7. Validation: evidence and limits

The following are historical results from the implementation session, not a claim that every command was rerun while writing this document.

| Check | Result | Meaning |
| --- | --- | --- |
| `npm run typecheck` | Passed | Existing code satisfies the TypeScript check. |
| `npm run lint` | Passed, zero warnings | Existing code passed ESLint. |
| `npm run test` | Passed: 3 tests, 2 files | Covers fixture identity/limits and the safe demo-lend announcement. |
| `npm run format:check` | Passed after code formatting | Existing implementation passed the formatting check. |
| Default `npm run build` | Failed in restricted environment | Google font fetching failed because of DNS/network restrictions. |
| `KIVA_OFFLINE_FONTS=1 npm run build` | Passed | All required routes were generated with fallback fonts. |
| Playwright | Attempted, blocked | Local server could not listen with `EPERM`; browser execution was also restricted. |
| Desktop/mobile manual acceptance | Not completed | Visual fidelity, browser console, keyboard flow, and overflow remain to be checked. |
| GitHub publication | Verified | Remote source exists in `kiva-demo`; screenshots excluded. |
| Vercel deployment and production smoke test | Not performed | No production application URL is recorded. |

The existing Playwright suite contains two scenarios configured for desktop and mobile: safe home-to-setup navigation and keyboard access to the main action. It checks the concept label, robots metadata, overflow, safe borrower feedback, route navigation, and browser errors. These tests are useful but have **not passed in a browser**, and they do not cover the future setup/save/edit/reset flow.

Passing a build does not establish that the UI looks correct, that all future plan combinations work, or that the product hypothesis is validated.

## 8. Local development and environment recovery

On a normal machine with network access and permission to run a local server:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

If Google font downloads are unavailable, the explicit fallback is:

```bash
KIVA_OFFLINE_FONTS=1 npm run dev -- --webpack
```

For a production-style local run:

```bash
KIVA_OFFLINE_FONTS=1 npm run build
npm run start
```

Offline mode uses Georgia/Arial rather than the intended Lora/Inter pair. It is a documented restricted-environment workaround, not the desired final visual presentation. Normal builds should use the intended fonts when connectivity permits. The configuration includes both Webpack replacement and a Turbopack alias, while the documented offline development command explicitly uses Webpack.

Required checks for continuing implementation:

```bash
npm run typecheck
npm run lint
npm run test
npm run format:check
npm run build
npx playwright install chromium
npm run test:e2e
```

Install Chromium if needed; do not assume an environment blocker disappears just because the test tooling is installed. Verify desktop at roughly 1280–1600 pixels and mobile around 390 pixels. The prior errors describe the earlier agent environment, not a demonstrated defect in the deployed application or a permanent limitation on Cursor or the user's machine.

## 9. Milestone status and remaining work

| Milestone | Status | Remaining work |
| --- | --- | --- |
| 0: Project setup | Implemented; acceptance incomplete | Verify boot/console and normal-font production build; reconcile dependency versions. |
| 1: Design foundation | Implemented; acceptance incomplete | Manually validate visual fit, mobile overflow, and keyboard navigation. |
| 2: Home context | Implemented; acceptance incomplete | Verify home layout and navigation in desktop/mobile browsers. |
| 3: Setup shell | Not implemented | Schema, progress, draft storage, step navigation, browser Back, edit query parameter. |
| 4: Participation | Not implemented | Three accessible single-choice cards; required selection and clear control level. |
| 5: Preferences | Not implemented | Multiple causes, optional location/gender, validation, helper copy. |
| 6: Money behavior | Not implemented | Funding/repayment controls, monthly amount, compatibility guidance and tests. |
| 7: Review | Not implemented | Dynamic MoneyFlow, summary/edit, risk note, normalized save. |
| 8: Completed My Impact | Not implemented | Persisted account state, plan card, mode-specific actions, edit/review. |
| 9: Recommendations | Partially scaffolded | Expand fixtures; add plan-based matching, explanations, and matching count. |
| 10: About | Interim page exists | Finish planned product/research content; add reset. |
| 11: Quality pass | Pending | Full accessibility, combinations, mobile, copy, content/privacy, and browser checks. |
| 12: Deployment | GitHub step complete; deployment pending | Vercel project, production URL, robots/disclaimer validation, final smoke test. |

Creating early fixtures and an About page does not complete Milestones 9 and 10. Likewise, pushing to GitHub does not complete Milestone 12.

## 10. What should happen next

### First: confirm the published baseline and finish foundation acceptance

Use `kiva-demo`, not the unused replacement repository. Bring this handoff and the latest local build log into the ChatGPT context. If the continuation environment uses only the remote repository, it will not automatically see these unpushed local documents.

Run the existing code in a functioning environment, complete the missing home/shell browser acceptance, confirm the intended fonts build, and check the dependency versions against supported current releases. Inspect the local changes before syncing so the user's work is preserved.

Reference screenshots were intentionally excluded from the public repository. If a future design review needs them, the user can provide them separately as references; do not add them to application assets or public repository content.

### Second: implement Milestone 3 as the next authorized coding increment

Build the state and navigation foundation before adding all form screens:

* A versioned, validated plan model following the architecture's participation, preferences, funding, repayment, and timestamp fields.
* Separate draft and completed-plan state, with a current setup step.
* A small browser-storage adapter using the proposed key `kivaImpactPlanPrototype`.
* Safe handling of malformed/unsupported stored values and unavailable storage.
* Step navigation, progress, Back/Continue, and predictable edit links such as `/impact-plan?step=2`.
* Safe handling of direct visits to review or My Impact without a valid plan.

Storage handling should account for client/server boundaries and hydration in Next.js. Persist only anonymous demo choices. A normalized completed plan must not be overwritten by an incomplete draft simply because the user begins editing.

These are recommended continuation details, not a claim that they already exist. Add React Hook Form/Zod when they serve this implementation; avoid a global-state package or backend.

The architecture's suggested enum values are `manual | guided | automatic` for participation, `manual | monthly | repayments_only` for funding, and `balance | recommend | auto_relend` for repayments. Its version-1 object also includes `causes`, `locations`, `borrowerGender` (`all | women | men`), nullable `monthlyAmount`, and `createdAt`/`updatedAt`. Validate these values rather than trusting parsed storage. Confirm the four-step flow's indexing—participation, preferences, money behavior, review—before wiring progress and edit URLs; implementation milestone numbers are not step numbers.

### Third: implement Milestones 4–6 with explicit product decisions

Participation has three modes: manual borrower choice, guided short list, and automatic selection. Require an intentional selection rather than silently assigning a mode.

Preferences require at least one cause and allow optional location/gender constraints. Use the documented cause taxonomy rather than inventing unrelated filters. Money behavior has three funding modes and three repayment modes; monthly funding requires sensible positive numeric input.

The suggested causes are Climate threatened people, Agriculture, Conflict zones, Refugees and IDPs, Water and sanitation, Entrepreneurs, Education, Arts, Food, Single parents, and Kiva U.S. Monthly funding starts with a $25 illustrative amount when selected; it does not request a payment method or activate any recurring charge.

One compatibility decision remains unresolved in the original documents: manual participation with automatic relending can either be disabled/guided toward another choice or permitted only with a clear explanation and explicit confirmation of the changed control level. The architecture leans toward explicit confirmation; the PRD allows either approach. Choose a consistent behavior deliberately and record it before building Milestone 6.

Guided participation supports all repayment modes. Automatic participation with repayments returning to balance needs a clear explanation that repaid money will wait rather than automatically relend. Avoid contradictory messaging or silent changes to the user's choices.

Keep compatibility logic as a pure, testable function. Use native radio/checkbox semantics or equivalent accessible controls, visible non-color selection indicators, associated validation messages, and mobile touch targets.

### Fourth: build the review and completed account states

Use a dedicated review route as the preferred fourth step. The five stages should explain money entering, borrower selection, loan funding, repayment, and the next action. Stages should change with the plan and state what happens, who decides, and what triggers the next stage.

Use a horizontal sequence on desktop and a vertical sequence on mobile. Include the required risk language: principal loss is possible, repayment is not guaranteed, and the prototype does not move real money.

Edit links should return to the relevant step with values intact. Saving validates/normalizes the plan, persists it, and routes to `/my-impact`. A saved-plan money-flow view should be read-only unless the user explicitly enters editing.

The completed account state needs the compact plan card, edit action, money-flow link, and participation-specific recommendations/status. The home entry card should switch to an active-plan state. Refresh must preserve the completed plan.

### Fifth: complete recommendations, About, QA, and deployment

Expand local fixtures and implement simple transparent plan matching with explanations. Manual mode offers browsing aligned with priorities; guided mode shows useful illustrative matches; automatic mode shows status and a matching count with an explicit no-real-automation disclaimer. Add a graceful no-match state. Do not imply this local logic is Kiva's algorithm.

Finish About and add a reset control that removes the prototype's own state and returns it to the initial new-lender experience. It must not clear unrelated browser storage.

Then complete the full QA plan, including the guided happy path, automatic monthly plan, manual/automatic conflict, refresh, editing, reset, and mobile flow. Deploy to Vercel only after the appropriate checks and review. Use an unambiguous concept project name, confirm production noindex/nofollow, and record the actual production URL and smoke-test results in `BUILD_LOG.md`.

## 11. Non-negotiable scope and communication rules

* Keep this visibly unofficial and unaffiliated with Kiva.
* Do not build real authentication, Kiva account sync, lending, payments, donations, checkout, or automation enrollment.
* Do not request credentials, bank/card details, or personal information.
* Do not add a database, AI chat, unrelated features, runtime scraping, or undocumented Kiva APIs.
* Keep reference screenshots out of public assets and the published source.
* Use local fictional borrower data and clearly label illustrative behavior.
* Do not imply guaranteed repayment, impact, returns, or tax outcomes.
* Distinguish lending capital from direct donations rather than adding donation pressure.
* Preserve the calm visual direction and use `CONTENT_COPY.md` as the default copy source.
* Do not describe an unrun test, unverified runtime behavior, or unvalidated product hypothesis as proven.

No PM outreach, message sending, research interviews, Vercel deployment, or real Kiva integration has been performed as part of this work.

## 12. Research and final success criteria

The public-product inspection provides observations, not proof of user confusion. Important unknowns include which settings lenders use together, whether repayments are understood, where recurring setup is abandoned, the size and causes of idle balances, support volume for money routing, and the role of Giving Funds within an integrated model.

The finished prototype should allow a reviewer to understand the problem in about 30 seconds, complete setup in under two minutes, explain the next $25 and subsequent repayments, distinguish lending from donations, and edit the plan without searching across settings pages. Those are target outcomes, not measured achievements of the current build.

Production metrics such as completion, repeat lending, recurring adoption, and idle-balance reduction are hypothetical. Research should also watch for settings reversals, unintended automation complaints, support contacts, and loss of perceived control.

The outreach goal is useful product feedback and a more informed second iteration. The planned two-minute demo cannot be delivered from the current foundation alone; the setup, review, persistence, and completed state must come first.

## 13. Suggested message to the original ChatGPT conversation

> I implemented Milestones 0–2 of the Kiva Impact Plan brief you helped create and published the source through Cursor to https://github.com/Sambhav255/kiva-demo. Please read CHATGPT_HANDOFF.md alongside the original project documents and inspect the current code before revising the plan. The home and design foundation exist; setup/review are placeholders, and saved plans, compatibility logic, matching, and reset are still pending. Existing static checks and the offline-font build passed, but browser acceptance was blocked in the previous environment. Help me finish that acceptance and plan the next Milestone 3 increment, then continue the remaining milestones in order while preserving the unofficial, local-only, no-real-money scope. Do not assume that GitHub publication means the full prototype is complete or deployed.

## 14. Snapshot and handoff boundaries

This document describes the repository and work observed as of October 6, 2026. The verified publication commit was `cc5c2081dc2ed880316dd38be27909afc684bd87`; later changes should be reviewed against that baseline rather than assumed to match it.

The source repository is the durable project artifact. Temporary publication checkouts/scripts under `/private/tmp` were environment-specific recovery aids, not project dependencies or a recommended long-term workflow. The unused replacement GitHub repository is not the continuation target.

This document and the latest local `BUILD_LOG.md` changes have been created locally. Their creation does not imply that they have been committed or pushed. Include this document explicitly when handing the project back to ChatGPT.
