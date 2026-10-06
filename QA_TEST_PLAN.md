# QA Test Plan

## Quality bar

This prototype will be sent directly to product leaders. It should behave like a small finished product rather than a design exercise held together by happy path assumptions.

## Automated checks

Required before deployment:

* TypeScript check passes
* ESLint passes
* Unit tests pass
* Production build passes
* Playwright happy path passes

## Unit tests

### Impact Plan schema

Test:

* Valid manual plan
* Valid guided plan
* Valid automatic plan
* Monthly funding requires a positive monthly amount
* Invalid stored values are rejected
* Empty cause list is rejected

### Compatibility logic

Test:

* Manual plus balance
* Manual plus recommend
* Manual plus auto relend produces guidance
* Guided supports all repayment modes
* Automatic plus auto relend is coherent
* Automatic plus balance produces an explanation

### Formatting

Test human readable summaries for every enum value.

## Component tests

### ChoiceCard

* Click selects
* Keyboard selects
* Selected state has accessible semantics

### CausePicker

* Multiple causes can be selected
* Selected causes can be removed
* Continue is blocked when none are selected

### Money behavior

* Monthly option reveals amount
* Other options hide amount
* Validation message appears for invalid amount

### MoneyFlow

Render at least one test for each participation mode and repayment mode combination.

## Playwright flows

### Flow A: Guided lender

1. Open `/`
2. Click Set plan
3. Choose Show me a short list
4. Select Education and Entrepreneurs
5. Choose manual funding
6. Choose Show me new matches
7. Review money flow
8. Save plan
9. Confirm My Impact shows the saved plan
10. Refresh
11. Confirm the plan persists
12. Open Edit
13. Confirm previous values are populated

### Flow B: Automatic lender

1. Reset prototype
2. Choose Lend for me
3. Select two causes
4. Choose monthly funding
5. Enter twenty five dollars
6. Choose automatic relending
7. Review
8. Save
9. Confirm completed state shows automation concept disclaimer

### Flow C: Manual lender conflict

1. Reset prototype
2. Choose Choose every borrower
3. Choose a cause
4. Choose automatic relending
5. Confirm the product explains the change in control level
6. Confirm the user can revise the repayment selection

### Flow D: Mobile

Run the guided lender flow at a mobile viewport.

Confirm:

* No horizontal overflow
* Progress indicator remains understandable
* Choice cards stack cleanly
* Money flow becomes vertical
* Primary actions remain visible

## Manual visual QA

Compare against reference screenshots for:

* Background tone
* Navigation proportions
* Heading character
* Card radius
* Button weight
* Spacing rhythm
* Use of green
* Density of information

Do not chase pixel matching where it harms clarity.

## Accessibility QA

Check:

* Tab order
* Visible focus state
* Radio and checkbox semantics
* Form labels
* Error associations
* Heading hierarchy
* Button names
* Contrast
* Reduced motion
* Touch target size

## Content QA

Confirm:

* Unofficial concept label appears
* No claims of Kiva endorsement
* No guarantee of repayment
* No guarantee of impact
* No real account language that implies a transaction occurred
* No request for credentials
* No private information copied from the logged in account

## Deployment smoke test

After production deploy:

* Open production URL in private browsing
* Complete guided flow
* Refresh completed state
* Reset demo
* Open About page
* Verify mobile view
* Verify no 404s
* Verify browser console has no errors
* Verify site source does not include reference screenshots
* Verify robots metadata says noindex and nofollow
