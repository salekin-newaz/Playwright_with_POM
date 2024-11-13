import { test, expect } from '@playwright/test';

test('Login Test with Orange HRM', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');

  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('banner').getByRole('img', { name: 'profile picture' }).click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
});


/*
To run playwright inspector-- npx playwright codegen
To run inspector auto capture code and create file-- npx playwright test ./tests/codegen.spe.js --headed
 */