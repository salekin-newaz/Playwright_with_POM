// /pages/homepage.js
const { expect } = require("@playwright/test");

class HomePage {
    constructor(page) {
        this.page = page;
        this.manageOption = "//span[text()='Manage']";
        this.menu = "//img[@alt='menu']";
        this.logOut = "//button[text()='Sign out']";
    }

    async verifyManageOption() {
        await expect(this.page.locator(this.manageOption)).toBeVisible({ timeout: 10000 });;
    }

    async logoutFromApplication() {
        await this.page.click(this.menu);
        await this.page.click(this.logOut);
    }
}

module.exports = HomePage;
