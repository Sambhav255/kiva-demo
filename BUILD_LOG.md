# Build Log

Use this file to record implementation decisions as Codex works.

## Current status

The reduced Impact Plan feature demo is implemented as of October 6, 2026. It contains a minimal root page and a complete three-step wizard/result on `/impact-plan`, with local completed-plan persistence, edit, and scoped reset. Type checking, lint, 21 unit/interaction tests, formatting, and the offline-font production build pass. Manual desktop/mobile browser checks passed. The standard build remains blocked by Google Fonts DNS access. No production deployment was performed.

The earlier milestone and publishing sections below are historical records; their original wider-site UI was removed under the scope change. See “Reduced feature demo” for the current implementation and checks.

## Completed milestones

- Milestone 0: Next.js App Router, strict TypeScript, Tailwind CSS, Inter/Lora through `next/font`, ESLint, Prettier, Vitest/Testing Library, Playwright tooling, and noindex/nofollow metadata.
- Milestone 1: Shared color/type/spacing rules, reusable surface cards and buttons, global/account navigation, persistent concept badge, footer, keyboard focus styles, responsive shell, and skip link.
- Milestone 2: New-lender home with impact overview, three next-step cards, the Set plan entry point, three local fixture borrower cards with CSS artwork, and a simplified lower section. Demo borrower actions explicitly state that no loan will be placed.
- All five required routes resolve. Setup and review are explicit later-milestone placeholders; `/my-impact` currently shows the new-lender home. About provides interim rationale and the unaffiliated disclaimer.

These are implementation statuses, not claims that the desktop/mobile acceptance criteria have been fully verified.

## Intentional deviations from the PRD

- Limited this delivery to Milestones 0–2. Setup, completed-plan persistence/editing, recommendation matching, and demo reset remain scheduled for later milestones.
- Used cached Next.js 16.2.9 because network access prevented installing the identified current stable 16.3.8 release. `eslint-config-next` is the cached 16.2.4 version. Reconcile these versions when network access is available.
- Added optional `KIVA_OFFLINE_FONTS=1` for restricted environments. It uses Georgia/Arial fallbacks; normal builds use the specified Inter/Lora via `next/font`.

## Known issues

- Default production build cannot fetch Google font files in this environment (`fonts.googleapis.com` DNS failure). The explicit offline build succeeds.
- Desktop/mobile visual inspection, browser console checks, navigation checks, and runtime overflow checks remain unverified. Local servers cannot listen here (`EPERM`); headless Chromium also fails macOS bootstrap/Mach port permissions. No browser surface was available through computer-use tooling.
- This scoped foundation does not yet support the full PRD demo flow or its two persistent demo states.

## Tests

- Type check: passed (`npm run typecheck`).
- Lint: passed with zero warnings (`npm run lint`).
- Unit tests: passed, 3 tests across 2 files (`npm run test`).
- Formatting: passed after final code changes (`npm run format:check`).
- Playwright: attempted; blocked when its local web server failed to listen with `EPERM`. Desktop/mobile tests are configured, but did not execute.
- Production build: default command failed fetching Google fonts; `KIVA_OFFLINE_FONTS=1 npm run build` passed and generated all required routes.

## Deployment

Production URL:

Not deployed.

## Notes

- Read all project markdown documents before implementation and used reference screenshots only for visual guidance. Reference screenshots remain outside `public` and are not imported into app content.
- Dependencies were installed from cached packages because registry network access was unavailable.
- Loan fixtures are separated from the UI through a provider boundary. No account connection, database, payment form, transaction, or real automation was added.
- Deployment is a later milestone and was not performed.

- Parallel scope/accessibility and dependency reviews found no blockers. Corrected impact metric definition-list order; lockfile dry run and dependency consistency checks passed.

## Repository publishing

The entries in this section describe historical attempts. Successful publication to `kiva-demo` is confirmed in the next section; agent-side write/network restrictions were not resolved by that external publication.

- Destination requested: `https://github.com/Sambhav255/kiva-demo`, branch `main`.
- Prepared a local Git repository at `/private/tmp/kiva-demo-publish`, excluding reference screenshots and generated artifacts.
- Repository access now confirms owner `Sambhav255` has push/admin rights. The remote contains only its initial README commit; no implementation was published.
- GitHub connector writes to both Git trees and repository contents fail with HTTP 403, `Resource not accessible by integration`. Its installation repository search does not list this repository. The exact app repository/scope configuration still needs browser inspection.
- Terminal Git and CLI login are blocked by this managed session's networking restrictions (`Could not resolve host: github.com`). CLI token validity cannot be established while GitHub is unreachable.
- Browser access recovered. Created the private replacement repository `Sambhav255/kiva-impact-plan-concept` at the user's request; the source upload did not complete because the browser file-upload permission request was dismissed. The repository remains empty. No app permission settings were changed.
- Prepared `/private/tmp/kiva-push.sh` for terminal publishing when networking is available. It checks authentication, preserves the reviewed remote initial commit, excludes screenshots, stops if the remote unexpectedly changes, and pushes without force. Shell syntax check passed.

- Prepared `/private/tmp/kiva-push-concept.sh` for authenticated publishing to the new repository from a normal Terminal. It verifies the signed-in account and refuses to overwrite unrelated remote history.

- Retried publishing: terminal push still fails DNS resolution for `github.com`. Browser confirms the new private repository exists and remains empty. Browser upload now identifies the ChatGPT extension's disabled “Allow access to file URLs” setting as the blocker. Browser security policy rejects opening `brave://extensions`, so that setting must be enabled by the user directly.

## Publication confirmed

- The user published the implementation through Cursor to `https://github.com/Sambhav255/kiva-demo`, branch `main`.
- Verified the remote main commit `cc5c2081dc2ed880316dd38be27909afc684bd87` and the repository tree through the GitHub connector. Application source, configuration, tests, and product documentation are present; reference screenshots are excluded.
- `kiva-demo` is the published repository. The separately created private `kiva-impact-plan-concept` repository was not used.
- This local build-log update has not been pushed.

## ChatGPT handoff document

- Created `CHATGPT_HANDOFF.md` on October 6, 2026 for the conversation that produced the original brief and plan.
- Reconciled the product documents, current source, test coverage, and verified GitHub publication with parallel product and implementation reviews.
- Documented completed versus planned milestones, exact current route behavior, dependencies, fixtures, verification limitations, publishing history, research unknowns, and a detailed continuation sequence.
- The handoff and latest local log changes have not been pushed. No application code changed during this documentation task.

## Reduced feature demo — October 6, 2026

### Scope and implementation

- The user's revised scope supersedes the old implementation milestones. Updated AGENTS.md, PRD.md, and README.md; marked IMPLEMENTATION_PLAN.md and the earlier CHATGPT_HANDOFF.md as historical.
- Kept Next.js, strict TypeScript, Tailwind, Inter/Lora configuration, visual tokens, reusable cards/buttons, skip link, focus/reduced-motion treatment, and noindex/nofollow metadata. No dependency upgrade or new package was introduced.
- Replaced the root with minimal concept context, the exact Set your Impact Plan card copy, and Set my plan CTA. Removed marketplace/borrower UI, account statistics, full navigation/footer, fixtures/provider, and obsolete tests/components.
- Built a three-step wizard on /impact-plan: intentional participation choice; six causes with optional region/gender preferences; funding and repayment choices with monthly amount validation.
- Completed result stays on /impact-plan and shows dynamic five-stage $25 lifecycle, compact plan/preferences summary, Edit plan, and Reset demo. No transactions, matching algorithm, accounts, or API integration exists.
- Completed plans use versioned anonymous local storage under kivaImpactPlanPrototype. Malformed data is ignored safely; unavailable storage produces an honest warning. Reset removes only this entry. Draft choices remain in memory during Back/Continue and are not persisted.
- Manual borrower choice disables automatic relending. Editing an automatic-relending plan to manual returns repayments to balance with a visible announcement. Automatic participation with balance/matches distinguishes new funds from returned repayments. Repayment-only funding honors the repayment choice rather than implying a new deposit or automatic use of waiting funds.
- Legacy /about redirects to /; /my-impact and /impact-plan/review redirect to /impact-plan. No additional product surface remains.

### Verification

- npm run typecheck: passed after build-generated types settled. An initial check raced the concurrent build's generated-file replacement; the subsequent standalone checks passed.
- npm run lint: passed.
- npm run test: passed, 21 tests across two files. Covers all 27 funding/participation/repayment combinations (3 rejected conflicts), invalid/corrupt storage, dynamic wording, monthly validation, full interaction flow, refresh persistence, editing, and scoped reset.
- npm run format:check and git diff --check: passed.
- npm run build: attempted; Google Fonts lookup failed with ENOTFOUND fonts.googleapis.com after retries. The process was interrupted after those errors. Normal Inter/Lora production compilation is not verified in this managed environment.
- KIVA_OFFLINE_FONTS=1 npm run build: passed in the workspace (compiled in approximately 2.1 minutes). A temporary current-source copy at /private/tmp/kiva-reduced-build also passed; all pages and legacy redirects generated successfully.
- Manual connected-Brave checks passed at 1440px desktop and 390px mobile: root CTA, participation, multi-cause and location controls, funding/repayment selection, completion, saved result after reload, editing with values intact, manual/automatic conflict prevention, scoped reset to step 1, and native Space/ArrowDown radio selection. Mobile lifecycle uses a vertical column; tested pages showed no horizontal overflow. Robots metadata was noindex, nofollow.
- No application browser errors were observed in the checked flow. Browser-extension warnings were present and identified as extension-origin messages.
- Replaced the old Playwright specs with reduced-flow tests. They were not executed as an automated Playwright suite; manual browser and RTL verification are separate results.
- Thirty-second comprehension and sub-minute completion remain design targets; no PM usability study was conducted.

### Environment and publication

- User-requested codex mcp add playwright npx @playwright/mcp@latest was attempted and failed because this session cannot write /Users/sambhav/.codex/config.toml. MCP installation was not completed.
- Preserved the pre-existing package-lock.json reordering change. next-env.d.ts is generated by Next and may change between development and build commands.
- This implementation and current documentation changes are local and have not been committed/pushed by this agent. No deployment URL exists.

## Current handoff refresh

- Rewrote CHATGPT_HANDOFF.md for the implemented reduced feature demo, replacing the superseded Milestones 0–2 continuation guide.
- Included actual behavior, architecture, compatibility choices, persistence, validation evidence/limits, remaining work within scope, and a ready-to-paste Cursor publishing request plus explicit Git commands.
- Updated README.md to identify the handoff as current. This documentation update does not rerun application checks or publish source; reduced implementation and current documents remain local until a verified Cursor push.
