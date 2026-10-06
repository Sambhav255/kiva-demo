# Architecture

## Architectural goal

Keep the prototype small enough to understand in one sitting while making the interaction model easy to extend.

No server database is required.

## Suggested directory structure

```text
app/
  page.tsx
  about/
    page.tsx
  impact-plan/
    page.tsx
    review/
      page.tsx
  my-impact/
    page.tsx
  layout.tsx
  globals.css

components/
  shell/
    GlobalNav.tsx
    AccountNav.tsx
    Footer.tsx
    PrototypeBadge.tsx
  impact-plan/
    ProgressIndicator.tsx
    ParticipationChoice.tsx
    CausePicker.tsx
    PreferenceSelects.tsx
    MoneyBehaviorForm.tsx
    MoneyFlow.tsx
    PlanSummary.tsx
    ImpactPlanCard.tsx
  common/
    SurfaceCard.tsx
    PrimaryButton.tsx
    SecondaryButton.tsx
    ChoiceCard.tsx
    CauseChip.tsx
    LoanCard.tsx

data/
  loans.ts
  causes.ts
  locations.ts

lib/
  impact-plan/
    schema.ts
    compatibility.ts
    defaults.ts
    storage.ts
    format.ts
  loans/
    provider.ts
    static-provider.ts

tests/
  impact-plan.spec.ts
  compatibility.test.ts
  storage.test.ts

public/
  concept-art/
```

## Impact Plan model

Use a single normalized object.

Suggested shape:

```ts
type ParticipationMode = "manual" | "guided" | "automatic"

type FundingMode = "manual" | "monthly" | "repayments_only"

type RepaymentMode = "balance" | "recommend" | "auto_relend"

interface ImpactPlan {
  version: 1
  participationMode: ParticipationMode
  causes: string[]
  locations: string[]
  borrowerGender: "all" | "women" | "men"
  fundingMode: FundingMode
  monthlyAmount: number | null
  repaymentMode: RepaymentMode
  createdAt: string
  updatedAt: string
}
```

## Compatibility rules

Create a small pure function that evaluates whether selections create a coherent plan.

Suggested rules:

### Manual participation

Recommended repayment modes:

* balance
* recommend

If the user chooses auto relend, show a message that this changes the experience from fully manual to automatic when repayments return.

The user may continue if they explicitly confirm.

### Guided participation

All repayment modes are valid.

The recommended default is recommend.

### Automatic participation

The recommended repayment mode is auto relend.

If balance is selected, explain that automatic participation will only apply when new funds are available and repayments will wait in the balance.

## Persistence

Storage key:

`kivaImpactPlanPrototype`

Store:

* Impact Plan
* Current setup step
* Setup draft

Do not store unrelated browser data.

If stored data fails schema validation, discard it and use defaults.

## URL behavior

The setup route should support a query parameter for step when helpful:

`/impact-plan?step=2`

This makes Edit actions from the summary predictable.

Do not encode sensitive data in the URL.

## Loan data provider

Create an abstraction now even though the first implementation is static.

Suggested contract:

```ts
interface LoanProvider {
  getRecommendedLoans(plan: ImpactPlan, limit?: number): Promise<LoanSummary[]>
}
```

The static provider can rank fixtures using simple matching logic.

Example scoring:

* Add points for matching causes
* Add points for matching location
* Add points for matching borrower gender
* Return the highest scoring records

This logic is only for the prototype and must not be described as Kiva's recommendation algorithm.

## Recommendation explanation

Each returned fixture should expose a local explanation such as:

Matches your Education priority

Matches your U.S. preference

Matches two of your selected causes

The UI should make it obvious that this is prototype logic.

## Component responsibilities

### GlobalNav

Provides visual Kiva context and links to home and About.

### AccountNav

Provides the dark green account bar.

### PrototypeBadge

Persistent unofficial concept indicator.

### ProgressIndicator

Receives current step and handles no data state.

### ParticipationChoice

Pure choice component for three participation modes.

### CausePicker

Multi select cause control.

### MoneyBehaviorForm

Handles funding and repayment modes plus monthly amount.

### MoneyFlow

Receives a normalized Impact Plan and renders human readable stages.

This component is the conceptual centerpiece and should stay free of form logic.

### PlanSummary

Reusable summary for review and completed state.

### ImpactPlanCard

Compact account version of PlanSummary.

## Error handling

The app should have graceful local error states even though there is no backend.

Handle:

* Invalid local storage
* Missing plan on review route
* Missing plan on My Impact route
* Unknown cause values after a future schema change

Preferred behavior:

Redirect to setup with a small explanatory message rather than crashing.

## Performance

Keep JavaScript modest.

Avoid large UI libraries.

Use server components for static page shell where practical and client components only for interactive forms and persisted state.

No page should require remote data before first render.

## Metadata

Set page title:

Kiva Impact Plan Concept

Description:

An independent product concept exploring a clearer way for Kiva lenders to control how money is added, allocated, repaid, and reused.

Set robots to noindex and nofollow.
