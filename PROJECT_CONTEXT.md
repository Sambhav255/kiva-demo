# Project Context

## Background

Kiva is a nonprofit financial access platform whose lender experience has expanded beyond one simple behavior of selecting a borrower and making a loan.

The live account review in this folder shows a broader system containing manual lending, recommendations, goals, lending statistics, Auto Deposit, Auto Lending, Monthly Good, repayment settings, inactivity settings, direct donations, Teams, Giving Funds, and other participation mechanisms.

The individual features are useful. The product opportunity is that users must understand several separate concepts to know what will happen to their money over time.

This concept explores whether Kiva could make that system easier to understand by giving every lender one Impact Plan.

## Evidence from the captured product

### Post login home

Reference: `screenshots/01-post-login-home.png`

The home experience emphasizes:

* Impact overview
* Goal setting
* Recommended next steps
* Recommended borrowers
* Achievements
* Direct giving
* Auto Deposit
* Impact stories
* Category and location discovery

This indicates that the page is trying to serve activation, retention, discovery, giving, and education at the same time.

### My Impact portfolio

Reference: `screenshots/02-portfolio.png`

The account hub contains:

* Available balance
* Outstanding loans
* Goal setting
* Lending insights
* Donations to Kiva
* Impact content
* Kiva effect
* Lending Teams
* Portfolio distribution

The side navigation also separates lending, repayments, credit, withdraw, donations, cards, referrals, and history into distinct destinations.

### Lending stats

Reference: `screenshots/03-lending-stats.png`

Kiva tracks progress across:

* Countries and territories
* Sectors
* Activities
* Lending Partners
* Achievements

The product strongly reinforces breadth and progression.

### Settings

Reference: `screenshots/04-settings-overview.png`

Credit behavior is spread across separate settings:

* Repayment settings
* Inactivity settings
* Auto Lending settings
* Auto Deposit

These controls are related from the user's perspective but live as independent settings.

### Auto Lending

Reference: `screenshots/05-auto-lending.png`

The captured account shows an Auto Lending configuration with:

* Current status
* A rule for when balance will be lent
* A contribution to Kiva
* Borrower criteria
* A count of matching borrowers

This is a money routing system, not merely a preference setting.

### Monthly Good

Reference: `screenshots/06-monthly-good.png`

Monthly Good is presented as a separate recurring product that:

* Accepts a monthly amount
* Lets the user choose a category
* Automatically supports borrowers
* Provides updates through email
* Relends money after repayments

This overlaps conceptually with Auto Deposit and Auto Lending but is explained as its own product.

### Add Credit

Reference: `screenshots/07-add-credit.png`

New lenders cannot simply add credit before completing a first loan. This reinforces the importance of first loan activation in Kiva's product funnel.

### Teams

Reference: `screenshots/09-my-teams.png`

Teams provide a social participation layer with messages, shared identity, and collective impact.

### Donations

Reference: `screenshots/10-donation-history.png`

Direct donations to Kiva are treated separately from lending capital. This distinction is financially important but creates another mental model a lender must understand.

### Borrower profile and checkout

References:

* `screenshots/12-basket-one-loan.png`
* `screenshots/12a-added-to-basket-modal.png`
* `screenshots/13-borrower-anahi.png`

The borrower page is already information rich and the checkout experience distinguishes lending amount from support for Kiva.

This suggests the strongest concept should not be a borrower page redesign.

### Giving Funds

References:

* `screenshots/14a-giving-fund-landing.png`
* `screenshots/14-giving-fund-configure.png`
* `screenshots/14b-giving-fund-cause-options.png`

Giving Funds introduce a different interaction model:

* Choose causes
* Choose borrower gender preferences
* Choose locations
* Let Kiva allocate money across matching borrowers

This is further evidence that Kiva supports multiple levels of user control over lending decisions.

### Lend browse

Reference: `screenshots/15-lend-browse.png`

The loan marketplace already offers browsing, sorting, filtering, recommendations, and multiple discovery strategies.

The prototype should therefore not position recommendation quality as the primary missing capability.

## Product insight

The current system can be understood as a spectrum of control.

At one end, the lender chooses every borrower.

In the middle, Kiva can narrow the field, recommend borrowers, or automate recurring participation.

At the other end, Kiva can automatically deploy money based on broad preferences.

The lender also has separate decisions around how money enters the system and what happens when repayments return.

The product opportunity is to unify those decisions in one understandable plan.

## Core problem statement

A lender can use several Kiva features without having one clear mental model for how money will enter, be allocated, return, and be redeployed.

The concept should make that money lifecycle visible and controllable.

## Product hypothesis

If Kiva gives lenders one understandable Impact Plan that connects participation style, impact preferences, funding behavior, and repayment behavior, users will feel more confident about recurring participation without losing a sense of control.

## What this concept is not

It is not:

* A claim that Kiva's current product is broken
* A recommendation system replacement
* A new lending product
* A new charitable fund
* A checkout redesign
* A full account redesign
* A production ready Kiva integration

It is a prototype for one interaction layer that could connect capabilities Kiva already has.
