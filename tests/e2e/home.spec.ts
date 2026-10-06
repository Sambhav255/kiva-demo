import { test, expect } from '@playwright/test';
test('new lender home routes safely to the setup preview', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Your impact starts here' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Unofficial concept' }),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole('button', { name: 'Demo lend to A learning cooperative' })
    .click();
  await expect(page.getByRole('status').first()).toHaveText(
    'Prototype only. No loan will be placed.',
  );
  await page.getByRole('link', { name: 'Set plan', exact: true }).click();
  await expect(page).toHaveURL(/\/impact-plan$/);
  await expect(
    page.getByRole('heading', { name: 'Set your Impact Plan' }),
  ).toBeVisible();
  await page
    .getByRole('link', { name: 'Back to My impact', exact: true })
    .click();
  await page.getByRole('link', { name: 'Unofficial concept' }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(
    page
      .getByText('It is not produced or endorsed by Kiva', { exact: false })
      .first(),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test('keyboard users can reach the main action', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Set plan', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/impact-plan$/);
});
