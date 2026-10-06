# Deployment

## Recommended host

Vercel.

It is the simplest fit for a small Next.js concept and produces a clean URL that can be sent directly to Kiva product leaders.

## Repository

Create a dedicated GitHub repository.

Recommended repository name:

`kiva-impact-plan-concept`

Keep the repository private while building.

You can make it public later if you deliberately want the source to be part of your portfolio.

## Before first deployment

Run:

```bash
npm run lint
npm run test
npm run build
```

If Playwright is wired to a separate script, run that too.

## Vercel setup

Preferred method:

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Accept the detected Next.js configuration.
4. Deploy without environment variables.
5. Confirm the production build.

Alternative from the terminal:

```bash
npx vercel
```

Then promote a verified deployment to production.

## Production naming

Use a name that clearly identifies the site as a concept.

Good examples:

* `kiva-impact-plan-concept`
* `impact-plan-kiva-concept`

Avoid names that could look official, such as:

* `kiva-product`
* `kiva-dashboard`
* `official-kiva-impact`

Do not use a domain that could be mistaken for a Kiva owned domain.

## Required production metadata

Title:

Kiva Impact Plan Concept

Description:

An independent product concept exploring a clearer way for Kiva lenders to control how money is added, allocated, repaid, and reused.

Robots:

noindex

nofollow

## Required visible disclaimer

The deployed experience must display an Unofficial concept indicator.

The About page must state:

This is an independent product concept. It is not produced or endorsed by Kiva and does not connect to a real Kiva account.

## Privacy

Do not ship:

* Account screenshots
* Real account identifiers
* Payment data
* Browser session data
* Credentials
* Hidden Kiva account URLs

The prototype should contain only local demonstration state.

## Reference image handling

Keep the `screenshots` folder outside the public asset directory.

Do not copy it into `public`.

If the repository becomes public, decide whether you have the right and reason to publish the screenshots. The safer default is to remove them from the public repository before making the repository public.

## Final deployment checklist

* Production build succeeds
* Unofficial concept indicator is visible
* About page works
* Setup flow works
* Local storage works
* Reset works
* Mobile flow works
* No real transaction controls exist
* No screenshot files are publicly served
* Noindex is present
* No console errors

## Sharing with PMs

Send the production URL, not a development URL.

The link should open directly to the prototype home state.

Do not require sign in.

Do not require the reviewer to read instructions before using it.

The first meaningful action should be obvious within a few seconds.
