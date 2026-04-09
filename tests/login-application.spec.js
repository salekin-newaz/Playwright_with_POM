const { test } = require('@playwright/test');
const LoginPage = require("../pages/login.page");
const HomePage = require("../pages/home.page");

test.use({ storageState: { cookies: [], origins: [] } });

const loginEmail = process.env.LOGIN_EMAIL;
const loginPassword = process.env.LOGIN_PASSWORD;

test('Login to Application', async ({ page }) => {
    await page.goto('/login');

    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(loginEmail, loginPassword);
    const homePage = new HomePage(page);
    await homePage.verifyManageOption();
    await page.context().storageState({ path: 'authState.json' });

});
