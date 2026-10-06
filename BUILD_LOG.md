# Build Log

Use this file to record implementation decisions as Codex works.

## Current status

Milestones 0–2 implemented on October 5, 2026. Type checking, linting, unit tests, and formatting pass; the offline-font production build succeeds. Browser acceptance verification remains blocked by the execution environment.

## Completed milestones

* Milestone 0: Next.js App Router, strict TypeScript, Tailwind CSS, Inter/Lora through `next/font`, ESLint, Prettier, Vitest/Testing Library, Playwright tooling, and noindex/nofollow metadata.
* Milestone 1: Shared color/type/spacing rules, reusable surface cards and buttons, global/account navigation, persistent concept badge, footer, keyboard focus styles, responsive shell, and skip link.
* Milestone 2: New-lender home with impact overview, three next-step cards, the Set plan entry point, three local fixture borrower cards with CSS artwork, and a simplified lower section. Demo borrower actions explicitly state that no loan will be placed.
* All five required routes resolve. Setup and review are explicit later-milestone placeholders; `/my-impact` currently shows the new-lender home. About provides interim rationale and the unaffiliated disclaimer.

These are implementation statuses, not claims that the desktop/mobile acceptance criteria have been fully verified.

## Intentional deviations from the PRD

* Limited this delivery to Milestones 0–2. Setup, completed-plan persistence/editing, recommendation matching, and demo reset remain scheduled for later milestones.
* Used cached Next.js 16.2.9 because network access prevented installing the identified current stable 16.3.8 release. `eslint-config-next` is the cached 16.2.4 version. Reconcile these versions when network access is available.
* Added optional `KIVA_OFFLINE_FONTS=1` for restricted environments. It uses Georgia/Arial fallbacks; normal builds use the specified Inter/Lora via `next/font`.

## Known issues

* Default production build cannot fetch Google font files in this environment (`fonts.googleapis.com` DNS failure). The explicit offline build succeeds.
* Desktop/mobile visual inspection, browser console checks, navigation checks, and runtime overflow checks remain unverified. Local servers cannot listen here (`EPERM`); headless Chromium also fails macOS bootstrap/Mach port permissions. No browser surface was available through computer-use tooling.
* This scoped foundation does not yet support the full PRD demo flow or its two persistent demo states.

## Tests

* Type check: passed (`npm run typecheck`).
* Lint: passed with zero warnings (`npm run lint`).
* Unit tests: passed, 3 tests across 2 files (`npm run test`).
* Formatting: passed after final code changes (`npm run format:check`).
* Playwright: attempted; blocked when its local web server failed to listen with `EPERM`. Desktop/mobile tests are configured, but did not execute.
* Production build: default command failed fetching Google fonts; `KIVA_OFFLINE_FONTS=1 npm run build` passed and generated all required routes.

## Deployment

Production URL:

Not deployed.

## Notes

* Read all project markdown documents before implementation and used reference screenshots only for visual guidance. Reference screenshots remain outside `public` and are not imported into app content.
* Dependencies were installed from cached packages because registry network access was unavailable.
* Loan fixtures are separated from the UI through a provider boundary. No account connection, database, payment form, transaction, or real automation was added.
* Deployment is a later milestone and was not performed.

* Parallel scope/accessibility and dependency reviews found no blockers. Corrected impact metric definition-list order; lockfile dry run and dependency consistency checks passed.

## Repository publishing

The entries in this section describe historical attempts. Successful publication to `kiva-demo` is confirmed in the next section; agent-side write/network restrictions were not resolved by that external publication.

* Destination requested: `https://github.com/Sambhav255/kiva-demo`, branch `main`.
* Prepared a local Git repository at `/private/tmp/kiva-demo-publish`, excluding reference screenshots and generated artifacts.
* Repository access now confirms owner `Sambhav255` has push/admin rights. The remote contains only its initial README commit; no implementation was published.
* GitHub connector writes to both Git trees and repository contents fail with HTTP 403, `Resource not accessible by integration`. Its installation repository search does not list this repository. The exact app repository/scope configuration still needs browser inspection.
* Terminal Git and CLI login are blocked by this managed session's networking restrictions (`Could not resolve host: github.com`). CLI token validity cannot be established while GitHub is unreachable.
* Browser access recovered. Created the private replacement repository `Sambhav255/kiva-impact-plan-concept` at the user's request; the source upload did not complete because the browser file-upload permission request was dismissed. The repository remains empty. No app permission settings were changed.
* Prepared `/private/tmp/kiva-push.sh` for terminal publishing when networking is available. It checks authentication, preserves the reviewed remote initial commit, excludes screenshots, stops if the remote unexpectedly changes, and pushes without force. Shell syntax check passed.

* Prepared `/private/tmp/kiva-push-concept.sh` for authenticated publishing to the new repository from a normal Terminal. It verifies the signed-in account and refuses to overwrite unrelated remote history.

* Retried publishing: terminal push still fails DNS resolution for `github.com`. Browser confirms the new private repository exists and remains empty. Browser upload now identifies the ChatGPT extension's disabled “Allow access to file URLs” setting as the blocker. Browser security policy rejects opening `brave://extensions`, so that setting must be enabled by the user directly.

## Publication confirmed

* The user published the implementation through Cursor to `https://github.com/Sambhav255/kiva-demo`, branch `main`.
* Verified the remote main commit `cc5c2081dc2ed880316dd38be27909afc684bd87` and the repository tree through the GitHub connector. Application source, configuration, tests, and product documentation are present; reference screenshots are excluded.
* `kiva-demo` is the published repository. The separately created private `kiva-impact-plan-concept` repository was not used.
* This local build-log update has not been pushed.

## ChatGPT handoff document

* Created `CHATGPT_HANDOFF.md` on October 6, 2026 for the conversation that produced the original brief and plan.
* Reconciled the product documents, current source, test coverage, and verified GitHub publication with parallel product and implementation reviews.
* Documented completed versus planned milestones, exact current route behavior, dependencies, fixtures, verification limitations, publishing history, research unknowns, and a detailed continuation sequence.
* The handoff and latest local log changes have not been pushed. No application code changed during this documentation task.
