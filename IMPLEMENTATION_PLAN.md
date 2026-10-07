# Implementation Plan

> **Superseded — historical roadmap only (October 6, 2026).** Do not continue these milestones. The product is now a minimal root context page and a three-step Impact Plan demo with its result on `/impact-plan`. Follow the latest user request, `AGENTS.md`, and `PRD.md`. Wider lender-site navigation, dashboards, borrower cards, recommendation logic, a dedicated review surface, and a large About page below are no longer in scope.

Build in small milestones. The site should be deployable after every milestone from Milestone 2 onward.

## Milestone 0: Project setup

Tasks:

* Initialize current stable Next.js project with TypeScript and App Router
* Add Tailwind CSS
* Add Lora and Inter through `next/font`
* Add linting and formatting
* Add test tooling
* Confirm `npm run build` passes
* Add noindex metadata

Acceptance criteria:

* App boots locally
* Production build succeeds
* No console errors

## Milestone 1: Design foundation

Tasks:

* Define global color tokens
* Define type scale
* Create page background and container rules
* Build SurfaceCard
* Build PrimaryButton
* Build SecondaryButton
* Build GlobalNav
* Build AccountNav
* Build PrototypeBadge
* Build Footer

Acceptance criteria:

* Shell visually resembles the screenshot family
* Mobile shell does not overflow
* Navigation is keyboard accessible

## Milestone 2: Home context

Tasks:

* Build `/`
* Recreate the top portion of the new lender home using local static data
* Add impact overview card
* Add three recommended next step cards
* Make the first card Set your Impact Plan
* Add three simplified loan cards
* Add concept badge

Acceptance criteria:

* Page clearly feels like the Kiva lender account context
* Set plan takes user to `/impact-plan`
* No screenshot image is shipped as a page background or content asset

## Milestone 3: Impact Plan setup shell

Tasks:

* Build progress indicator
* Create plan schema
* Create draft persistence
* Create step navigation
* Add Back and Continue actions
* Support route query parameter for editing a specific step

Acceptance criteria:

* Refresh does not lose current draft
* Browser Back behaves sensibly
* Invalid persisted data does not crash the page

## Milestone 4: Step 1 participation

Tasks:

* Build three ChoiceCard options
* Add descriptions and selected states
* Require one choice
* Set sensible default only after explicit user interaction or use no default

Acceptance criteria:

* Mouse, touch, and keyboard work
* Selection is visible without relying only on color

## Milestone 5: Step 2 preferences

Tasks:

* Build cause chip grid
* Require at least one cause
* Add optional location selector
* Add optional gender selector
* Add broader preferences helper copy

Acceptance criteria:

* User can choose multiple causes
* All controls remain usable at mobile width

## Milestone 6: Step 3 money behavior

Tasks:

* Build funding mode controls
* Reveal amount input for monthly funding
* Build repayment mode controls
* Add compatibility guidance
* Add unit tests for compatibility rules

Acceptance criteria:

* Monthly amount accepts sensible numeric values only
* Contradictory states are explained
* The user always knows the expected behavior of the chosen combination

## Milestone 7: Review and money flow

Tasks:

* Build `/impact-plan/review`
* Build MoneyFlow component
* Build PlanSummary
* Add Edit actions
* Add risk disclaimer
* Save normalized plan to local storage

Acceptance criteria:

* Flow language changes based on plan
* Reviewer can understand the lifecycle without returning to previous screens
* Save routes to `/my-impact`

## Milestone 8: Completed My Impact state

Tasks:

* Build `/my-impact`
* Add account overview
* Add Your Impact Plan card
* Add behavior specific recommendation section
* Add Edit plan action
* Add See how your money moves action

Acceptance criteria:

* All three participation modes produce coherent completed states
* Refresh preserves plan

## Milestone 9: Static recommendation layer

Tasks:

* Create fixture loan data
* Create LoanProvider interface
* Create StaticLoanProvider
* Add basic matching logic
* Add recommendation explanation

Acceptance criteria:

* Guided mode returns useful looking recommendations
* Automatic mode can show matching borrower count without presenting fake transactions
* Recommendation algorithm is labelled as prototype logic where relevant

## Milestone 10: About page

Tasks:

* Build `/about`
* Explain problem and hypothesis
* Explain unknowns and next research
* Add reset control
* Add link back to prototype

Acceptance criteria:

* A PM can understand the rationale without an external deck
* Reset returns app to initial state

## Milestone 11: Quality pass

Tasks:

* Run accessibility review
* Add focus states
* Test reduced motion
* Test desktop and mobile
* Test all plan combinations
* Check copy against `CONTENT_COPY.md`
* Verify no private information is present
* Verify no reference screenshots are part of deployed assets
* Check no broken links

Acceptance criteria:

* Main Playwright flow passes
* Type check passes
* Lint passes
* Production build passes

## Milestone 12: Deployment

Tasks:

* Push to GitHub
* Connect to Vercel
* Use an unambiguous project name
* Verify production URL
* Verify noindex metadata in production
* Run final smoke test
* Update `BUILD_LOG.md`

Recommended project name:

`kiva-impact-plan-concept`

Recommended page title:

Kiva Impact Plan Concept
