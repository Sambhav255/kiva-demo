# UI Specification

## Design goal

The prototype should feel plausibly native to the current Kiva lender product without presenting itself as an official Kiva page.

Use the screenshots as visual evidence for spacing, hierarchy, color, card treatments, typography roles, navigation, and interaction patterns.

Do not reproduce proprietary assets or ship screenshot images in the public app.

## Reference screenshots

### Overall shell and post login home

`screenshots/01-post-login-home.png`

Use for:

* Top navigation proportions
* Dark account navigation
* Page background
* Recommended next steps card rhythm
* Impact overview treatment
* Borrower card density
* Footer structure

### My Impact

`screenshots/02-portfolio.png`

Use for:

* Main account page width
* Left navigation behavior
* White surface cards
* Green summary panel
* Large section spacing

### Settings

`screenshots/04-settings-overview.png`

Use for:

* Settings card layout
* Large serif headings
* Vertical section rhythm

### Auto Lending

`screenshots/05-auto-lending.png`

Use for:

* Configuration page proportions
* Simple explanatory card structure
* Preference summary language

### Giving Fund setup

`screenshots/14-giving-fund-configure.png`

Use for:

* Preference picker treatment
* Select fields
* Matching borrower count
* Save and create action hierarchy

### Loan browsing

`screenshots/15-lend-browse.png`

Use for:

* Borrower card sizing
* Filter controls
* Rounded chips
* Recommended content section

## Brand approximation

Use a visual system inspired by the captured product rather than copied CSS.

### Color tokens

Suggested values sampled approximately from the screenshots:

* `ink`: `#100F0D`
* `forest`: `#27382A`
* `green`: `#3A6947`
* `greenBright`: `#55A76D`
* `mintBackground`: `#EEF4F1`
* `warmBackground`: `#F7F2E7`
* `white`: `#FFFFFF`
* `border`: `#DCE5E0`
* `mutedText`: `#66736A`
* `goldSoft`: `#F4DBA9`

The implementation may adjust values slightly after visual comparison with screenshots.

### Typography

Use open source substitutes.

Display and section headings:

* Lora or Newsreader
* Medium to semibold weight

Body, labels, buttons, and navigation:

* Inter
* Regular and medium weights

Use `next/font` so the build does not depend on a third party font request at runtime.

## Page shell

### Global top navigation

Desktop structure:

* Left: text based Kiva style wordmark
* Lend menu label
* Major gifts label
* Search field
* Partner with us
* About
* Give button
* Demo balance indicator
* Account avatar circle

The top navigation is visual context only. Most controls do not need to work.

The Kiva style wordmark must link back to `/`.

### Account navigation

Dark forest bar under the main navigation.

Items:

* My impact
* My teams
* Messages
* Settings

Only My impact needs to link inside the concept. The others can be visually present but disabled or show a small Prototype only tooltip.

### Prototype indicator

Add a subtle pill near the upper right edge of the content area:

Unofficial concept

Clicking it opens `/about`.

This label must remain visible enough that nobody can mistake the prototype for a real Kiva environment.

## Responsive behavior

Primary target:

Desktop width from 1280 to 1600 pixels.

Secondary target:

Mobile width around 390 pixels.

Tablet should work naturally but does not require custom design.

On mobile:

* Collapse account navigation into a compact tab row or menu
* Stack cards
* Make choice cards full width
* Keep the progress indicator visible
* Convert the money flow diagram into a vertical sequence
* Maintain at least 44 pixel interactive targets

## Route specification

## `/`

Purpose:

Show a believable new lender My Impact home state and create context for the concept.

Layout:

1. Global navigation
2. Account navigation
3. Impact overview banner
4. Recommended next steps
5. Recommended borrower cards
6. More ways to help
7. Footer

Only the first two or three sections need full fidelity. Lower sections may be simplified.

### Key concept modification

The first recommended next step should be:

Set your Impact Plan

Supporting copy:

Choose what matters to you and what should happen when money comes back.

Primary action:

Set plan

This action routes to `/impact-plan`.

### Demo reset state

When the user already has a completed plan, replace the entry card with:

Your Impact Plan is active

Primary action:

View plan

Secondary action:

Edit

## `/impact-plan`

Purpose:

Four step setup experience.

### Page frame

Use a centered content column around 760 to 860 pixels wide.

Top region:

* Back to My impact
* Serif heading
* One sentence explanation
* Four step progress indicator

Use a white surface card against the pale green background.

### Step 1

Heading:

How involved do you want to be?

Show three large selectable cards.

Each card contains:

* Short title
* One sentence description
* Small visual indicator of the control level

Option 1:

Choose every borrower

Description:

You decide where every loan goes.

Option 2:

Show me a short list

Description:

Kiva suggests a few matches and you choose.

Option 3:

Lend for me

Description:

Kiva automatically relends based on your preferences.

Interaction:

One option required.

Selected card gets green border, pale green fill, and a check icon.

### Step 2

Heading:

What matters to you?

Use selectable cause chips in a generous wrapping grid.

Minimum one cause.

Then show two optional preference rows:

Location

Borrower gender

Keep them optional and visually secondary.

Add a small helper note:

Broader preferences give Kiva more borrowers to choose from.

### Step 3

Heading:

How should money move?

Use two subsections.

Section A:

How should money enter Kiva?

Options:

* I will add money when I want
* Add a set amount monthly
* Only reuse repayments

If monthly is selected, reveal a simple amount field with twenty five dollars as the initial demo amount.

Section B:

What should happen when borrowers repay?

Options:

* Return repayments to my balance
* Show me new matches
* Relend automatically

Add explanatory copy under each option.

When combinations are inconsistent with participation style, show a gentle guidance message and make the final expected behavior explicit.

### Step 4 inside the same route

The route may present review as the fourth step before navigating to `/impact-plan/review`, or the route can navigate after Step 3. The preferred implementation is a dedicated review route for clearer browser history.

## `/impact-plan/review`

Purpose:

Make the money lifecycle understandable before the user saves the plan.

### Header

Your Impact Plan

Supporting copy:

Here is what your next twenty five dollars would do based on these choices.

### Money flow diagram

Desktop:

Horizontal sequence of five connected cards.

Mobile:

Vertical sequence.

Stages:

1. Money enters Kiva
2. Borrower selection
3. Loan is funded
4. Repayments return
5. Your plan decides what happens next

The content of stages one, two, and five should change based on the user's selections.

Example for guided selection:

1. You add money when you want
2. Kiva shows a short list based on Education and Entrepreneurs
3. You choose a borrower
4. Repayments return over time
5. Kiva shows new matches when funds come back

### Plan summary

Show four rows:

* Participation
* Priorities
* Funding
* Repayments

Each row has an Edit action that returns to the correct setup step.

### Disclosure

Place below the money flow:

Lending through Kiva involves risk of principal loss. Repayment is not guaranteed. This prototype does not move real money.

### Actions

Primary:

Save Impact Plan

Secondary:

Back

Save routes to `/my-impact` and persists the plan.

## `/my-impact`

Purpose:

Show how the completed plan could live in Kiva's existing lender account architecture.

Use the My Impact screenshot as the closest layout reference.

### Required content

Account overview card

Your Impact Plan card

Recommended next action section

Small lending insights summary

Optional borrower recommendations based on the plan

### Your Impact Plan card

Header:

Your Impact Plan

Status pill:

Active

Show concise values:

Participation

Priorities

Funding

Repayments

Primary action:

Edit plan

Secondary text link:

See how your money moves

The secondary link opens the review page in read only mode.

### Recommended section behavior

Manual participation:

Show Browse loans matching your priorities.

Guided participation:

Show three borrower fixture cards with Why this matches you labels.

Automatic participation:

Show plan status, number of matching fixture borrowers, and a clear statement that no real automation is active in the prototype.

## `/about`

Purpose:

Allow a Kiva PM to understand the reasoning without reading an external deck.

Sections:

* Problem observed
* Hypothesis
* What this prototype connects
* What it does not assume
* What I would validate next
* Prototype disclaimer
* Reset demo state

Keep this page concise and product oriented.

## Component specification

### ChoiceCard

Used for high level decisions.

States:

* default
* hover
* selected
* disabled

### CauseChip

Rounded capsule control.

Selected state uses green fill or pale green fill with a green border.

### SurfaceCard

White background, subtle border, large radius, minimal shadow.

### PrimaryButton

Dark green background, white text, rounded corners.

### SecondaryButton

White background, green border, dark text.

### ProgressIndicator

Four numbered steps with current step emphasized.

Labels can be hidden on mobile.

### MoneyFlow

Most important custom component.

Each stage must communicate:

* What happens
* Who decides
* What triggers the next step

Avoid decorative complexity.

### PlanSummary

A reusable compact representation of the four main plan decisions.

### LoanCard

Use simplified local fixtures.

Fields:

* Placeholder image or illustration
* Location
* Short borrower purpose
* Cause tags
* Amount remaining
* Demo lend button that does not transact

If clicked, the button should show a message:

Prototype only. No loan will be placed.

## Accessibility

* Meet WCAG AA contrast where practical.
* Every custom selection control must have a native radio or checkbox semantic equivalent.
* Focus states must be visible.
* Keyboard users must be able to finish the complete setup.
* Do not communicate selected state only through color.
* Error messages should be connected to the field they describe.
* Respect reduced motion.

## Motion

Keep motion subtle.

Allowed:

* 150 to 220 millisecond card selection transitions
* Soft content fade when advancing steps
* Small progress indicator movement

Avoid:

* Full screen transitions
* Parallax
* Confetti
* Large spring animations

The product should feel calm and trustworthy.
