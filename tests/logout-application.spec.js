const { test } = require('@playwright/test');
const HomePage = require("../pages/home.page");

test.use({ storageState: 'authState.json' });

test('logout', async ({ page }) => {
    await page.goto('/');

    const homePage = new HomePage(page);
    await homePage.logoutToApplication();
});
