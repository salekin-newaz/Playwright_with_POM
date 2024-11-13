// global-setup.js
const { chromium } = require('playwright');
const LoginPage = require("./pages/loginpage");

module.exports = async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://freelance-learn-automation.vercel.app/login');
    const loginpage = new LoginPage(page);
    await loginpage.loginToApplication();

    await context.storageState({ path: 'authState.json' });
    await browser.close();
};
