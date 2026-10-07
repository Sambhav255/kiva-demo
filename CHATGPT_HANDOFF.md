# Kiva Impact Plan — current ChatGPT handoff

Updated October 6, 2026, after the scope change and implementation of the reduced feature demo.

## 1. Current status and authoritative scope

**The project is now a brief interactive product demo of Kiva Impact Plan, not a recreation of the Kiva lender website.** The previous handoff described a Milestones 0–2 foundation. That snapshot and its roadmap are superseded.

The reduced demo is implemented locally:

- `/`: minimal Kiva-inspired context and one Set your Impact Plan card.
- `/impact-plan`: a complete three-step wizard, followed by a dynamic illustrative $25 money lifecycle and compact plan summary on the same route.
- Completed plans persist locally; the user can edit or reset them.
- The wider Kiva shell, account statistics, borrower marketplace cards, fixtures/provider, and obsolete related components/tests have been removed.

**Do not continue `IMPLEMENTATION_PLAN.md` as currently written.** It is retained as a historical record, not an active backlog. Follow the latest user request and current `AGENTS.md` and `PRD.md`. Older requirements in UI, copy, architecture, QA, and outreach documents are subordinate wherever they conflict with the reduced scope.

Canonical source repository: **https://github.com/Sambhav255/kiva-demo**, branch **`main`**. The unused private repository `kiva-impact-plan-concept` is not the continuation target.

The initial foundation was published through Cursor. The current local Git history includes `ba28425` (“Add a ChatGPT handoff for the published prototype.”). The reduced implementation and this updated handoff are currently local, uncommitted changes; their presence on GitHub has not been verified. Push the complete reduced implementation before relying on a fresh repository import into ChatGPT.

No production deployment or production application URL is recorded. Publishing source to GitHub is separate from deploying the demo.

## 2. Product intent

Kiva already exposes multiple mechanisms for borrower choice, recurring participation, funding, and repayment behavior. The proposed feature connects those choices in one understandable plan.

The hypothesis is that making the money lifecycle visible could improve comprehension and confidence while preserving control. This remains an unvalidated product hypothesis. The demo does not establish that Kiva users are confused, that retention will improve, or that Kiva should replace its existing products.

The audience is Kiva product managers reviewing one concrete proposed feature. The target is to understand the concept in under 30 seconds and complete the interaction in under one minute. Those are design targets, not measured usability-study results.

The key artifact is the visual explanation of an example $25: where money comes from, who selects the borrower, how a loan is funded, what repayment means, and what happens next. The surrounding site should remain minimal so that this feature is the focus.

## 3. What the current demo does

### Root page

The root keeps a small Kiva-inspired brand treatment, visible Unofficial concept indicator, short concept explanation, and one card.

Exact card content:

- Title: **Set your Impact Plan**
- Copy: **Decide how involved you want to be and what should happen when money comes back.**
- Primary CTA: **Set my plan**, linking to `/impact-plan`.

There are no borrower cards, account balance/impact metrics, search UI, account navigation, or full footer. A short independence/no-real-money disclosure remains visible.

### Step 1 — How involved do you want to be?

Require an intentional choice; there is no preselected participation mode:

1. Choose every borrower
2. Show me a short list
3. Lend for me based on my preferences

The interface uses native radio inputs with clickable choice cards and visible selected states.

### Step 2 — What matters to you?

Allow multiple choices and require at least one:

- Women
- Education
- Climate
- Entrepreneurs
- Refugees
- Agriculture

Optional location choices are Anywhere, Africa, Asia, Latin America, and United States. Optional borrower gender choices are Any gender, Women, and Men. These are illustrative preferences, not real marketplace filters or matching rules.

### Step 3 — How should your money move?

Funding choices:

- I will add money when I want
- Add a set amount monthly
- Only reuse repayments

Repayment choices:

- Return to my available balance
- Show me new matches
- Relend automatically based on this plan

Funding defaults to manual and repayments default to balance, both visibly selected. Monthly funding reveals a USD amount input with an initial example of $25. Validation requires a positive amount, no more than two decimal places, and a maximum of $1,000,000. No payment details are collected and no recurring charge is activated.

Back and Continue retain draft selections during the mounted wizard. Completion validates and normalizes the choices, then shows the result on the same route. There is no separate checkout, save-to-account flow, or dashboard.

### Result

The result shows five connected stages:

1. $25 enters Kiva, or returns to Kiva for repayment-only funding.
2. Borrower selection based on participation and preferences.
3. Illustrative loan funding.
4. Conditional borrower repayment, with risk language.
5. The configured next action: balance, matches, or automatic relending.

Funding, participation, causes, region/gender, and repayment behavior affect the wording. The lifecycle is horizontal on desktop and vertical on mobile.

The Your Impact Plan card summarizes participation, selected causes, funding, repayments, and optional preferences. **Edit plan** prepopulates the wizard. **Reset demo** clears only the prototype's storage entry and returns to step 1.

The result explicitly states that lending and automation are not activated. Repayment is not guaranteed and principal loss is possible. It is an example, not a transaction receipt.

## 4. Compatibility decisions implemented

These are current behavior, not unresolved architecture suggestions:

- **Manual borrower selection + automatic relending is blocked.** The automatic-relending option is disabled with a visible explanation.
- If a saved automatic-relending plan is edited to manual participation, repayments are changed to balance and a visible status message announces the change. The user can choose another compatible repayment behavior in step 3.
- Guided participation can use all repayment modes. Initial borrower choice is guided; later repayments can follow the separately chosen behavior.
- Automatic participation with balance explains that returned repayments wait for the user's decision rather than being automatically relended.
- Automatic participation with new matches explains that returned money requires a borrower choice.
- Repayment-only funding adds no new money. Its example assumes an earlier loan has returned $25; without repayments, the plan waits.
- For automatic participation plus repayment-only funding, the initial returned $25 follows the repayment control. Balance means it waits; new matches means the user chooses; automatic relending means preference-based selection. Loan funding is conditional on the required user decision rather than contradicting the balance setting.
- Monthly contributions below $25 can accumulate before the illustrative $25 journey. The monthly preference is not a scheduled payment.

## 5. Architecture and important files

The existing foundation remains: Next.js 16.2.9 App Router, React 19.2.4, strict TypeScript 5.9.3, Tailwind 4.2.1, ESLint, Prettier, Vitest/React Testing Library, and Playwright tooling. No package was added or upgraded for the scope change.

Inter/Lora remain configured through `next/font`; an explicit existing offline mode uses Georgia/Arial. Forest green, pale green/white backgrounds, serif display headings, sans serif text, rounded cards, restrained borders/shadows, and green buttons remain. Most visual rules are authored in `app/globals.css`, with Tailwind enabled.

| File                                        | Current responsibility                                                                       |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `app/layout.tsx`                            | Minimal shared header, badge, short disclaimer, skip link, fonts, noindex/nofollow metadata. |
| `app/page.tsx`                              | Minimal concept entry page.                                                                  |
| `app/impact-plan/page.tsx`                  | Renders the complete interactive demo.                                                       |
| `components/impact-plan/ImpactPlanDemo.tsx` | Three-step client-side wizard, validation feedback, edit/reset, result state.                |
| `components/impact-plan/PlanResult.tsx`     | Lifecycle and compact summary.                                                               |
| `lib/impact-plan/model.ts`                  | Typed choices, normalization, runtime validation, storage parsing, summary/lifecycle copy.   |
| `lib/impact-plan/storage.ts`                | Scoped storage reads/writes and subscription handling.                                       |
| `components/common/Buttons.tsx`             | Retained reusable button/link variants.                                                      |
| `components/common/SurfaceCard.tsx`         | Retained reusable card surface.                                                              |
| `components/shell/PrototypeBadge.tsx`       | Visible unofficial indicator, no separate About destination.                                 |
| `app/globals.css`                           | Retained tokens plus reduced shell, wizard, result, responsive/focus rules.                  |
| `tests/impact-plan-model.test.ts`           | Model validation, combinations, corrupt data, lifecycle wording.                             |
| `tests/impact-plan-demo.test.tsx`           | Complete interaction, persistence, edit/reset, validation/storage failures.                  |
| `tests/e2e/home.spec.ts`                    | Updated automated browser scenarios for the reduced demo.                                    |

Legacy routes redirect without adding product surfaces:

- `/impact-plan/review` → `/impact-plan`
- `/my-impact` → `/impact-plan`
- `/about` → `/`

Deleted wider-site code includes GlobalNav, AccountNav, Footer, ImpactOverview, NextSteps, LoanCard, ConceptArt, MilestonePlaceholder, loan fixtures/provider, and their old unit tests. Do not restore these to complete the historical milestone plan.

### Plan state

A version-1 completed plan stores participation, causes, location, gender, funding, monthly amount, and repayment behavior. Nonmonthly plans normalize the monthly amount to `null`. The storage key is `kivaImpactPlanPrototype`.

Only valid completed anonymous plans are persisted. Drafts are held in React state during Back/Continue; draft persistence, cross-device sync, and account storage are deliberately unnecessary.

Refresh restores a valid completed result after client hydration. Malformed, unsupported, or contradictory persisted data is ignored safely. If storage is unavailable, the result remains usable in memory and warns that it will not survive refresh. Reset removes only this demo's own entry, preserving unrelated browser storage.

No schema library, form package, global state package, backend, analytics, live Kiva data, or recommendation algorithm was added.

## 6. Verification already performed

The following results were recorded during reduced-scope implementation. They are not a claim that tests were rerun during this documentation-only update.

| Check                                   | Recorded result                                                                                                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run typecheck`                     | Passed after generated types settled.                                                                                                                                  |
| `npm run lint`                          | Passed.                                                                                                                                                                |
| `npm run test`                          | Passed: 21 tests across two files.                                                                                                                                     |
| `npm run format:check`                  | Passed.                                                                                                                                                                |
| `git diff --check`                      | Passed.                                                                                                                                                                |
| `npm run build`                         | Attempted; Google Fonts DNS errors occurred, and the process was interrupted after retries. Normal-font production compilation remains unverified in this environment. |
| `KIVA_OFFLINE_FONTS=1 npm run build`    | Passed in the workspace and in a temporary current-source copy.                                                                                                        |
| Manual desktop browser checks           | Passed at 1440px.                                                                                                                                                      |
| Manual mobile browser checks            | Passed at 390px; no observed horizontal overflow, vertical lifecycle.                                                                                                  |
| Automated Playwright suite              | Updated but not executed for this reduced version.                                                                                                                     |
| Vercel deployment/production smoke test | Not performed.                                                                                                                                                         |

Unit/interaction coverage includes the 27 participation/funding/repayment combinations, with three manual/automatic-relending conflicts rejected; monthly amount validation; normalization; corrupt/unsupported storage; dynamic money flow; required participation/causes; complete guided flow; preferences; refresh/remount; editing; scoped reset; and unavailable storage.

Manual connected-Brave checks covered root CTA, all three wizard steps, multi-cause/location controls, result, persistence after reload, prepopulated editing, manual conflict prevention, reset, native Space/ArrowDown radio selection, desktop/mobile layout, and noindex/nofollow. No application browser errors were observed in the checked flow; extension-origin warnings were identified separately. This was not a comprehensive accessibility audit or timed PM usability study.

An initial typecheck raced a concurrently running build replacing generated `.next` files. Subsequent standalone checks passed. Run build/typecheck sequentially when validating from Cursor to avoid that generated-file race.

## 7. Current environment limitations

The agent session could not write the repository's `.git` metadata or resolve GitHub from terminal commands. GitHub connector writes returned HTTP 403, while repository reads worked. Cursor previously succeeded in publishing from its own environment. Do not confuse an agent-side permission/network restriction with a broken repository or invalid user token.

The user requested `codex mcp add playwright npx @playwright/mcp@latest`. It was attempted but could not write `/Users/sambhav/.codex/config.toml`; installation was not completed. That command can be run from the user's normal terminal if the MCP setup is still desired. The connected browser was sufficient for the recorded manual verification.

No credential value should be placed in project files, this handoff, a commit, or chat. Reusable authentication and network access must be verified in the environment doing the publishing.

The existing uncommitted `package-lock.json` change was present before the reduced implementation and only reordered package entries. It was preserved. Review it separately rather than staging it accidentally. `next-env.d.ts` is generated and may change between dev/build commands.

## 8. Local commands and next steps

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. If Google Fonts cannot be fetched:

```bash
KIVA_OFFLINE_FONTS=1 npm run dev -- --webpack
```

Required validation, in sequence:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

If the build is blocked specifically by font downloads, record that limitation and verify the explicit fallback:

```bash
KIVA_OFFLINE_FONTS=1 npm run build
```

Next work should stay within this feature:

1. Push the complete reduced implementation and current documents to `kiva-demo` through Cursor.
2. Bring the updated repository/handoff into the original ChatGPT conversation; read current AGENTS/PRD before making suggestions.
3. Verify the normal Inter/Lora build from a network-capable environment and run the updated Playwright suite when practical.
4. Review whether a PM understands the $25 lifecycle in 30 seconds and can complete the flow in under one minute. Refine confusing copy/interactions within this scope based on feedback.
5. Deploy only when requested, then verify the actual URL, disclaimers, robots metadata, refresh/edit/reset, and mobile behavior. Record results in BUILD_LOG.

Do not add unrelated polish or more product surfaces to fill the old roadmap. The research hypothesis remains open even though the reduced demo is interactive.

## 9. Instructions to push through Cursor

### Ready-to-paste Cursor agent request

> Publish the current reduced Kiva Impact Plan demo to https://github.com/Sambhav255/kiva-demo on main. Read AGENTS.md, PRD.md, CHATGPT_HANDOFF.md, and BUILD_LOG.md first. Do not continue the old IMPLEMENTATION_PLAN.md or add features. Review the Git diff, including new Impact Plan files and intentional deletion of the old wider-site UI, loan fixtures/provider, and obsolete tests. Preserve unrelated existing changes, especially the incidental package-lock.json reorder. Run typecheck, lint, test, and build sequentially; if the normal build fails only on Google Fonts network access, record that and run KIVA_OFFLINE_FONTS=1 npm run build. Commit the reduced implementation plus updated scope documents and handoff with message "Replace wider Kiva prototype with focused Impact Plan demo", then push to origin main. Do not force-push, discard local changes, expose credentials, create another repository, or deploy. If the remote has new commits, stop and explain the divergence before overwriting anything. Verify the pushed commit and confirm CHATGPT_HANDOFF.md and the new wizard files are present remotely.

### Cursor terminal commands

Open this existing project in Cursor and use its integrated terminal. Confirm the current folder, branch, and destination first:

```bash
cd "/Users/sambhav/Desktop/_Archive/To Delete/kiva"
git status --short
git branch --show-current
git remote -v
```

Expected branch: `main`. Expected `origin`: `https://github.com/Sambhav255/kiva-demo.git`. Do not change the remote to the unused replacement repository.

Run the validation commands from section 8. Stage the complete reduced implementation and documentation, including tracked deletions:

```bash
git add -A -- app components lib data tests AGENTS.md PRD.md README.md BUILD_LOG.md CHATGPT_HANDOFF.md IMPLEMENTATION_PLAN.md
git diff --cached --check
git diff --cached --stat
git commit -m "Replace wider Kiva prototype with focused Impact Plan demo"
git push origin main
```

The explicit path list leaves the incidental package-lock.json change and generated files unstaged. Include them separately only if deliberately intended after review. If other changes were already staged, inspect `git diff --cached` before committing; the path list does not automatically unstage them.

Do not push only CHATGPT_HANDOFF.md: a fresh ChatGPT repository import needs the new components/model/tests, route changes, deletions, and updated requirements together. Do not stage screenshots, node_modules, .next, environment files, tokens, or test reports.

If Git reports that `main` is behind the remote or rejects a non-fast-forward push, stop and reconcile the histories without force-pushing. Do not run destructive reset/clean commands or stash unrelated changes without considering the user's work.

After a successful push:

```bash
git rev-parse HEAD
git status --short
```

Open GitHub and confirm the new commit, the updated CHATGPT_HANDOFF.md, and components/impact-plan/ImpactPlanDemo.tsx. Remaining unstaged incidental changes do not necessarily mean the reduced demo failed to publish; inspect their paths.

## 10. Message for the original ChatGPT conversation

> We changed scope. The repo is now a compact interactive demo of Kiva Impact Plan, not a Kiva lender-site recreation. Read the updated CHATGPT_HANDOFF.md, AGENTS.md, and PRD.md before discussing next steps. Do not continue the historical IMPLEMENTATION_PLAN.md. The minimal root page and full three-step wizard/result are implemented, including dynamic $25 lifecycle, completed local persistence, edit, reset, and compatibility handling. Wider-site navigation/dashboard/borrower fixtures were removed. Typecheck, lint, 21 tests, offline build, and desktop/mobile manual checks passed; normal production fonts and the automated Playwright suite still need verification in an appropriate environment. Help assess the clarity of this single feature within the reduced scope. Do not restore marketplace, dashboard, API, payment, account, or recommendation-algorithm work.

Use https://github.com/Sambhav255/kiva-demo after the Cursor push. Until that push is verified, this document describes the local implementation, not a confirmed new remote snapshot. The historical product observations and publishing attempts remain in BUILD_LOG.md and Git history; the current PRD/AGENTS and code define the demo.
