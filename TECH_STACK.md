# Tech Stack

## Recommendation

Use a simple client heavy Next.js application deployed to Vercel.

The prototype does not need a database, authentication service, payment provider, or backend integration.

The stack should optimize for speed of implementation, visual polish, reliability, and easy deployment.

## Core stack

### Framework

Current stable Next.js using the App Router.

Why:

* Straightforward deployment to Vercel
* Good routing and metadata support
* Easy server and client component boundaries
* Strong TypeScript support
* Familiar to Codex and common tooling

### Language

TypeScript with strict mode.

Why:

* Keeps plan state and component props explicit
* Prevents accidental invalid configuration states
* Improves maintainability during rapid iteration

### UI

Tailwind CSS.

Why:

* Fast visual iteration against screenshots
* Easy responsive implementation
* No need for a large component framework

Build custom components rather than introducing a full design system dependency.

### Fonts

Use `next/font`.

Suggested pair:

* Lora for display headings
* Inter for body and controls

### Icons

Use `lucide-react` for generic interface icons.

Do not attempt to reproduce custom Kiva icon artwork.

### Form state

Use React Hook Form and Zod.

Why:

* Clean validation for the setup flow
* Easy typed form schema
* Supports conditional fields
* Reduces manual input wiring

For cross route plan persistence, save the normalized plan to local storage through a small custom hook.

### State architecture

Do not use Redux or another global state package for the MVP.

Use:

* React state during individual steps
* React Hook Form for form values
* A lightweight `ImpactPlanProvider` only if cross route editing becomes awkward
* Local storage for persistent demo state

### Testing

Use:

* Vitest
* React Testing Library
* Playwright

Vitest covers data logic and configuration compatibility.

React Testing Library covers setup interactions.

Playwright covers the complete happy path and mobile flow.

### Quality tools

Use:

* ESLint
* Prettier
* TypeScript compiler

## Deployment

Use Vercel.

Recommended deployment shape:

* GitHub repository
* Vercel project connected to the main branch
* Automatic preview deployments on pull requests
* Production deployment from the main branch

No environment variables are required for the MVP.

## Data strategy

### MVP

Use local fixture data.

Create a `data/loans.ts` file with six to twelve representative loan records.

Fields should include:

* id
* name
* location
* purpose
* causes
* amountRemaining
* image placeholder key
* sector

Do not use live Kiva account data.

Do not scrape public pages at runtime.

### Future integration boundary

Create a provider interface so the UI does not depend directly on fixtures.

Conceptual interface:

`LoanProvider`

Responsibilities:

* list recommendations for an Impact Plan
* return a small set of matching loans
* expose a source label

Default implementation:

`StaticLoanProvider`

A future implementation could use a supported Kiva public data source if Kiva confirms an appropriate API for this use case.

Do not make the prototype depend on an old or undocumented developer API.

## Privacy and security

The prototype should collect no personal information.

Do not request:

* Email
* Password
* Payment method
* Address
* Bank information
* Kiva credentials

Store only the anonymous demo plan in local storage.

## Analytics

Do not add third party analytics by default.

If analytics are later desired for PM outreach, use a privacy conscious page view tool and document it clearly.

For the first version, the absence of analytics is preferable.

## Search indexing

Set metadata so the prototype is not indexed by search engines.

The site is intended for direct sharing, not public discovery.

Use noindex and nofollow metadata.

## Suggested package set

Core:

* next
* react
* react-dom
* typescript
* tailwindcss
* zod
* react-hook-form
* `@hookform/resolvers`
* lucide-react

Testing:

* vitest
* `@testing-library/react`
* `@testing-library/jest-dom`
* `@playwright/test`

Formatting and linting:

* eslint
* prettier

Do not add packages until there is a concrete need.
