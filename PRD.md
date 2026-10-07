# Kiva Impact Plan — current product requirements

Updated October 6, 2026. This reduced scope supersedes the original lender-site recreation and `IMPLEMENTATION_PLAN.md` roadmap.

## Purpose

Build a brief, interactive demonstration of one proposed feature for Kiva product managers: an Impact Plan that connects borrower participation, impact preferences, funding, and repayment behavior. Preserve the existing Next.js/TypeScript foundation and Kiva-inspired visual tokens.

The hypothesis is that making the money lifecycle visible could improve comprehension and confidence while preserving control. The prototype does not establish that Kiva users are confused or that any business outcome will improve.

Success targets: understandable in under 30 seconds, completable in under one minute, and clear enough for a reviewer to explain the illustrative next $25 and the action after repayment.

## Root page

Create minimal context, not a recreation of Kiva's homepage or lender account.

Show:

* An “Unofficial concept” indicator.
* One short sentence explaining the concept.
* A card titled “Set your Impact Plan.”
* Copy: “Decide how involved you want to be and what should happen when money comes back.”
* Primary CTA: “Set my plan,” opening `/impact-plan`.

Do not show marketplace cards, full account navigation, account statistics, or a full footer.

## Three-step wizard on `/impact-plan`

### Step 1: How involved do you want to be?

Require one intentional participation choice:

* Choose every borrower
* Show me a short list
* Lend for me based on my preferences

### Step 2: What matters to you?

Allow multiple selections from exactly this concise cause set:

* Women
* Education
* Climate
* Entrepreneurs
* Refugees
* Agriculture

Require at least one cause. Offer optional location and borrower gender preferences as secondary controls. Do not create advanced marketplace filters or calculate matching borrowers.

### Step 3: How should your money move?

Funding options:

* I will add money when I want
* Add a set amount monthly
* Only reuse repayments

Monthly funding reveals a simple positive amount input. It represents a preference, not a payment form, subscription, or real enrollment.

Repayment options:

* Return to my available balance
* Show me new matches
* Relend automatically based on this plan

Prevent or explain contradictory combinations. Manual participation cannot be combined with automatic relending, because that would contradict choosing every borrower. If an edited participation choice makes automatic relending invalid, return repayments to balance and visibly announce the change. The user can choose another compatible repayment behavior in step 3.

Guided participation can use all repayment modes; automatic relending means returned funds would use the preferences without another borrower choice. Automatic participation with balance or new matches must clearly explain that initial selection is automatic while repayments either wait in the balance or require a new decision.

Back and Continue preserve selections while moving through the wizard. All controls must support keyboard interaction and associated validation messages.

## Result on the same route

After completion, show the plan and its money lifecycle:

**$25 enters Kiva → borrower selection → loan funded → borrower repayment → configured next action**

Change wording dynamically with funding, participation, preferences, and repayment selections. The selection stage must distinguish choosing every borrower, choosing from a short list, and preference-based automatic selection. The final stage must distinguish balance, new matches, and automatic relending.

For repayments-only funding, explain that the illustrative $25 comes from existing repayments rather than a new deposit. Monthly funding should show the configured recurring amount without suggesting that a charge was activated. Repayment and subsequent reuse are conditional: repayment is not guaranteed.

Below the lifecycle, show a compact “Your Impact Plan” card containing:

* Participation style
* Selected causes and any optional preferences
* Funding behavior
* Repayment behavior

Provide “Edit plan” and “Reset demo.” Editing loads the existing values; completion saves the revised result. Reset returns the experience to its initial state and removes only the demo's own storage entry.

Persist a valid completed plan locally so refresh restores the result. Handle malformed or unavailable local storage safely. Draft persistence, accounts, backend state, and cross-device sync are not required.

## Routes and exclusions

The only product surfaces are `/` and `/impact-plan`. Existing `/impact-plan/review`, `/my-impact`, and `/about` URLs may redirect to the relevant current page rather than exposing additional surfaces.

Do not build Kiva marketplace, checkout, borrower detail pages, account settings, teams, messages, donations, Giving Funds, a full My Impact dashboard, recommendation algorithms, real Kiva API integration, authentication, payment flows, a database, a large About page, full Kiva navigation, or a full Kiva footer. Do not add AI chat, analytics, or unrelated polish.

## Visual, safety, and acceptance requirements

Keep the current calm visual foundation: pale green/white backgrounds, forest green, serif headings, sans serif body copy, rounded cards, soft borders, and green buttons. Screenshots remain visual references only and must not be shipped.

Keep the unofficial indicator visible. State that the concept is independent, not produced or endorsed by Kiva, and does not move real money. Avoid guaranteed repayment, impact, returns, or tax claims. The money lifecycle is an example, not a transaction receipt.

Run `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`. Test compatibility, dynamic lifecycle wording, wizard completion, editing, persistence, and reset as appropriate. Verify desktop/mobile and keyboard flow when possible. Record actual results and limitations in `BUILD_LOG.md`; do not report unrun checks as passed.
