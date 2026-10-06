# Demo and Outreach Guide

## What the prototype should communicate

The prototype should make three things obvious to a Kiva product leader.

First, the concept came from studying the actual product rather than inventing a generic feature.

Second, the concept respects existing Kiva capabilities instead of duplicating them.

Third, the builder understands that the real hypothesis still requires user and behavioral validation.

## Two minute demo path

### 1. Start on the My Impact inspired home

Point out that Kiva already presents several next actions to a new lender.

Open Set your Impact Plan.

### 2. Choose a participation style

Pick Show me a short list.

Explain:

The concept starts with level of control because current Kiva products span manual selection through automatic allocation.

### 3. Choose priorities

Select two causes.

Explain:

This reuses preference concepts Kiva already exposes in products such as Giving Funds rather than inventing a new taxonomy.

### 4. Configure money behavior

Choose manual funding and Show me new matches after repayment.

Explain:

The concept brings together decisions that currently live across multiple product surfaces.

### 5. Show the money flow

Spend most of the demo time here.

Explain:

The feature is fundamentally about comprehension. A lender should be able to predict what will happen to the next twenty five dollars before activating recurring behavior.

### 6. Save and show My Impact

Show the compact Impact Plan card.

Explain:

The goal is not to create another dashboard. The plan becomes one control layer inside the existing account.

## Thirty second verbal summary

Suggested wording:

I mapped Kiva's current lender experience and noticed that manual lending, Auto Deposit, Auto Lending, Monthly Good, repayment settings, and Giving Funds each give users control over a different part of the money lifecycle. I built this concept to test one question: could those decisions be easier to understand if a lender had one Impact Plan that explains how money enters Kiva, how borrowers are selected, and what happens when repayments return?

## What not to say

Do not say:

* Kiva's product is confusing
* Users are definitely confused
* This will increase retention
* Kiva should replace its current settings
* This is better than Monthly Good
* This is the obvious solution

Instead say:

* I observed overlapping controls
* I formed a hypothesis
* I built a prototype to make the hypothesis concrete
* I would want user research and product data before recommending implementation

## Evidence of product judgment

If asked why this concept and not a recommendation engine:

Explain that the marketplace already has substantial recommendation and filtering functionality and that Monthly Good already automates borrower selection around user preferences.

If asked why not redesign the dashboard:

Explain that the concept focuses on a user decision problem rather than visual organization alone.

If asked why no live API:

Explain that the prototype deliberately avoids depending on an undocumented data interface. The architecture includes a provider boundary so supported Kiva data could be integrated later.

## Research questions to ask Kiva PMs

These are good questions for a conversation after the demo.

* How does the team think about the relationship between Auto Deposit, Auto Lending, and Monthly Good today?
* Which lender behavior is hardest to explain to users?
* Where do people most often abandon recurring setup?
* Do repayment settings generate confusion or support volume?
* How do you segment lenders by desired level of control?
* How do you expect Giving Funds to fit into the long term individual lender account model?
* Is the main retention problem returning to choose another borrower, keeping balance deployed, or something else?
* Which part of this concept would be most useful to validate with users?

## Suggested outreach after the prototype is ready

Do not lead with asking for a volunteer role.

Lead with the artifact and a specific product question.

Example LinkedIn message:

Hi Shehaam, I spent time mapping Kiva's current lender experience and built a small product concept around one question: could Auto Deposit, Auto Lending, Monthly Good, and repayment behavior be easier to understand through one Impact Plan? I made a working prototype rather than a deck. Would you be open to fifteen minutes of feedback on whether I am solving a real problem?

Keep the message short. The link should do most of the work.

## What to prepare before sending

* Production URL
* One sentence problem statement
* One sentence hypothesis
* Two minute demo path
* GitHub repository if you want to share implementation quality
* Three questions you want PM feedback on

## What a successful conversation looks like

The immediate goal is not a job offer.

A strong outcome is one of these:

* A PM tells you whether the problem is real
* A PM shares a better product problem
* A PM introduces you to someone on the lender experience team
* A PM gives you access to a small volunteer research or prototyping problem
* A PM tells you which part of the concept aligns with current priorities

That feedback can then drive a second iteration that is much closer to Kiva's real roadmap.
