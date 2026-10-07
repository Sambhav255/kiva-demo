import { test, expect } from '@playwright/test';
test('context leads to a complete plan that survives refresh, editing and reset', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(
    page.getByText('Unofficial concept', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Set your Impact Plan' }),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
  await page.getByRole('link', { name: 'Set my plan' }).click();
  await expect(page).toHaveURL(/\/impact-plan$/);
  await page.getByRole('radio', { name: /Show me a short list/ }).check();
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByRole('checkbox', { name: 'Women', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Education', exact: true }).check();
  await page.getByRole('combobox', { name: /Location/ }).selectOption('Asia');
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByRole('radio', { name: /Only reuse repayments/ }).check();
  await page.getByRole('radio', { name: /Show me new matches/ }).check();
  await page.getByRole('button', { name: /See my Impact Plan/ }).click();
  await expect(
    page.getByRole('list', { name: 'Example $25 money lifecycle' }),
  ).toBeVisible();
  await expect(
    page.getByText('Women, Education', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: '$25 returns to Kiva' }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Your Impact Plan' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Edit plan' }).click();
  await expect(
    page.getByRole('radio', { name: /Show me a short list/ }),
  ).toBeChecked();
  await page.getByRole('button', { name: /Continue/ }).click();
  await expect(
    page.getByRole('checkbox', { name: 'Education', exact: true }),
  ).toBeChecked();
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByRole('button', { name: /See my Impact Plan/ }).click();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'How involved do you want to be?' }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test('mobile flow fits the viewport and supports keyboard entry', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole('link', { name: 'Set my plan' }).click();
  await page.getByRole('radio', { name: /Choose every borrower/ }).check();
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.getByRole('checkbox', { name: 'Climate', exact: true }).check();
  await page.getByRole('button', { name: /Continue/ }).click();
  await expect(
    page.getByRole('radio', { name: /Relend automatically/ }),
  ).toBeDisabled();
  await page.getByRole('button', { name: /See my Impact Plan/ }).click();
  await expect(
    page.getByRole('heading', { name: 'Your Impact Plan' }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
