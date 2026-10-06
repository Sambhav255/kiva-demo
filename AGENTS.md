# Instructions for Codex

You are building an unofficial product concept called Kiva Impact Plan.

Read all project markdown files before making architectural decisions. The product brief and UI specification are the source of truth.

## Product intent

This is not a generic portfolio project. The prototype should look and behave like a credible feature that could fit inside the current Kiva lender experience.

The point of the prototype is to show product judgment:

* The current product already has many mechanisms for lending, automating, depositing, donating, and recycling money.
* The concept does not replace those systems.
* The concept gives the user one understandable place to decide how those systems should work for them.

## Hard scope rules

* Do not build real authentication.
* Do not connect to a real Kiva account.
* Do not move money.
* Do not create payment forms.
* Do not submit data to Kiva.
* Do not claim that the prototype is affiliated with Kiva.
* Do not depend on an undocumented or unstable Kiva API.
* Do not scrape Kiva pages in the deployed app.
* Do not ship the reference screenshots to the public app.
* Do not spend time reproducing every current Kiva page.
* Do not add AI chat, conversational interfaces, or unrelated features.

## Visual rules

Use the screenshots in `screenshots` as visual references.

Match these characteristics:

* White and very pale green page backgrounds
* Dark forest green navigation
* Strong serif display headings
* Clean sans serif body copy
* Rounded white content cards
* Green primary buttons
* Soft borders and restrained shadows
* Generous whitespace
* Calm nonprofit financial product tone

Do not make a pixel perfect clone. The prototype should feel native to Kiva while remaining clearly an unofficial concept.

## Engineering rules

* Use current stable Next.js with the App Router.
* Use TypeScript with strict mode.
* Use Tailwind CSS.
* Keep state local to the browser.
* Persist the completed plan in local storage so refreshing the prototype does not reset it.
* Keep the data provider abstract so static loan fixtures can later be replaced by a supported public data source.
* Use accessible HTML and keyboard interactions.
* Keep components small and reusable.
* Do not introduce a database.
* Do not introduce global state libraries unless the flow becomes impossible to manage cleanly without one.

## Build discipline

After meaningful changes run:

* type checking
* linting
* unit tests
* production build

Before finishing a milestone, verify the main flow manually at desktop and mobile widths.

## Required routes

* `/`
* `/impact-plan`
* `/impact-plan/review`
* `/my-impact`
* `/about`

## Required persistent state

The app should support two demo states:

* New lender without an Impact Plan
* Lender with a completed Impact Plan

Add a small developer reset control on the About page so the prototype can be returned to its initial state without clearing browser storage manually.

## Data rules

Use local fixture data for borrower recommendation cards.

The fixtures may be inspired by the public screenshot examples, but do not rely on remote Kiva assets. Use neutral local placeholder artwork or CSS image treatments unless a clearly licensed public asset is deliberately added.

## Copy rules

Use the copy in `CONTENT_COPY.md` unless implementation constraints require minor wording changes.

Never imply guaranteed repayment, guaranteed impact, financial return, or tax outcomes.

## Completion behavior

When the main build is complete, update `BUILD_LOG.md` with:

* What was built
* Any intentional deviations from the PRD
* Known issues
* Test status
* Deployment URL if available
