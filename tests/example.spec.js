// @ts-check
const { test, expect } = require('@playwright/test');


/*
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
*/


test('test', async ({ page }) => {
  await page.goto('https://stg.ridealike.com/');
  await page.waitForTimeout(10000);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('salekin@yopmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Ridealike1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Enter Location' }).click();
  await page.getByRole('textbox', { name: 'Enter Location' }).fill('gulshan');
  await page.getByText('Gulshan 1Dhaka, Bangladesh').click();
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '2021 Audi 100 Wagon 4.1 (21' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Continue booking' }).click();
  await page1.getByRole('button', { name: 'Confirm Trip' }).click();
  await page1.getByRole('button', { name: 'Done' }).click();
});
