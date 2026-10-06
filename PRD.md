# Product Requirements Document

## Product name

Kiva Impact Plan

## Product type

Unofficial concept prototype for the individual lender experience.

## Product objective

Give a lender one place to understand and configure how their money should move through Kiva.

The user should leave setup able to answer:

* How much control do I have over borrower selection?
* What types of impact do I want to support?
* How does money enter my Kiva account?
* What happens when borrowers repay?

## Primary user

An individual Kiva lender who is new, lightly engaged, or returning after time away and does not yet have a clear recurring lending routine.

The first prototype should optimize for someone with little or no prior lending history because that is the cleanest place to test comprehension and setup.

## Secondary user

An existing lender who already has repayments, preferences, or recurring behavior but wants one place to understand and change those settings.

## User problem

Kiva has multiple ways to lend and automate impact. These systems are useful but distributed across separate product surfaces.

A lender may need to understand manual lending, Auto Deposit, Auto Lending, Monthly Good, repayment settings, direct donations, and other account controls before they can confidently predict what will happen to their money.

## Job to be done

When I decide to use Kiva more than once, I want to define how involved I want to be and what should happen to my money over time, so I can create recurring impact without repeatedly configuring separate features.

## Hypothesis

A unified Impact Plan will improve user comprehension and confidence by expressing several separate product settings as one coherent money lifecycle.

## Prototype success criteria

The concept succeeds as a demo if a first time viewer can:

* Understand the problem within thirty seconds
* Complete setup in under two minutes
* Predict what will happen to the next twenty five dollars
* Understand what happens after repayment
* Distinguish lending capital from donations to Kiva
* Change the plan without searching multiple account pages

## Long term product success metrics

These are hypothetical production metrics and should be labelled as such in the case study.

Primary metrics:

* Impact Plan completion rate
* First loan completion rate after plan creation
* Adoption of recurring participation
* Adoption of automatic relending where appropriate
* Reduction in idle account balance over time
* Thirty day and ninety day repeat lending rate

Comprehension metrics:

* Percentage of users who can correctly explain what happens to repayments
* Percentage of users who understand the difference between lending capital and direct donations
* Confidence score after configuring recurring behavior

Guardrail metrics:

* Increase in settings reversals shortly after plan creation
* Increase in support contacts related to money routing
* Increase in unintended automation complaints
* Drop in perceived lender control

## MVP scope

### Entry point

Add an Impact Plan card to a Kiva inspired My Impact home state.

The card should replace or sit near goal setting and clearly explain the value:

Set your Impact Plan

Decide what you care about and what Kiva should do when money comes back.

### Setup flow

The setup contains four conceptual steps.

#### Step 1: Participation style

Question:

How involved do you want to be?

Options:

* Choose every borrower
* Show me a short list
* Lend for me based on my preferences

The purpose is to establish the user's preferred level of control.

#### Step 2: Impact preferences

Question:

What matters to you?

Allow multiple cause selections using categories that already resemble the Giving Fund experience.

Suggested cause set:

* Climate threatened people
* Agriculture
* Conflict zones
* Refugees and IDPs
* Water and sanitation
* Entrepreneurs
* Education
* Arts
* Food
* Single parents
* Kiva U.S.

Also allow optional location and borrower gender preferences.

Do not reproduce the full advanced marketplace filtering system in the MVP.

#### Step 3: Money behavior

Question:

How should money move?

Funding options:

* I will add money when I want
* Add a set amount monthly
* Only reuse repayments

Repayment options:

* Return repayments to my available balance
* Show me new matches when money comes back
* Relend automatically based on this plan

The interface should dynamically explain what each choice means.

If the selected participation style conflicts with a repayment option, guide the user toward a compatible configuration rather than allowing contradictory settings.

Example:

If the user chooses Choose every borrower, automatic relending should either be disabled or clearly explained as a separate choice that changes the level of control.

#### Step 4: Review and money flow

Show a visual plan summary.

The user should see an example lifecycle for the next twenty five dollars:

Money added

Then borrower selection behavior

Then loan funding

Then repayment

Then the configured next action

Include a clear note that repayment is not guaranteed and that this is an unofficial prototype that does not move real money.

### Completed state

After saving the plan, return the user to a My Impact page.

Add a prominent Your Impact Plan card showing:

* Participation style
* Top causes
* Funding behavior
* Repayment behavior
* Edit Plan action

If the user chose guided selection, show a small Recommended for your plan section using static borrower fixtures.

If the user chose full automation, show a plan status summary instead of individual borrower cards.

## About page

Create a concise About this concept page for product reviewers.

It should explain:

* The observed product problem
* The hypothesis
* What was intentionally left out
* What would need to be validated with real Kiva users and data
* That the prototype is unofficial and unaffiliated

Include a reset demo state button.

## Required interactions

* User can move forward and backward through setup without losing selections.
* User can exit setup and return later in the same browser.
* User can edit a completed plan.
* User can reset the demo.
* User selections persist across refresh using local storage.
* All form controls can be used with keyboard navigation.

## Out of scope

Do not build:

* Real sign in
* Real Kiva account sync
* Checkout
* Payment processing
* Bank or card details
* Real Auto Deposit enrollment
* Real Auto Lending enrollment
* Real Monthly Good enrollment
* Giving Fund creation
* Real loan transactions
* Donation transactions
* Messaging
* Teams
* Borrower comments
* Administrative tools
* Production analytics
* A database

## Product principles

### Make money movement legible

At every step, describe what will happen rather than naming a setting without context.

### Preserve user control

Automation should feel reversible and explicit.

### Reuse Kiva concepts

This is a unification concept, not an attempt to rename every existing product.

### Use progressive disclosure

Do not expose every Kiva filter or account setting during setup.

### Be transparent about uncertainty

Never imply guaranteed repayment or guaranteed impact.

### Avoid donation pressure

Do not use the prototype to optimize donations to Kiva. The concept should clarify the difference between lending capital and donations, not create a new upsell.

## Open questions for real product discovery

These questions should appear in the case study because they demonstrate what cannot be learned from public product inspection alone.

* Which lender segments currently use Auto Lending, Auto Deposit, and Monthly Good together?
* How often do users change automation settings soon after enabling them?
* What percentage of available lender balance remains idle?
* Do users understand what happens when repayments arrive?
* What is the first loan to second loan conversion rate?
* How much confusion exists between direct donations and lending capital?
* How does Kiva internally distinguish Monthly Good from Auto Deposit plus Auto Lending?
* Which settings generate the most support volume?
* Which parts of the current lender dashboard drive repeat lending?
* How should Giving Funds appear in an integrated individual impact model?
