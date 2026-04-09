const { expect } = require('@playwright/test');

class HomePage{
    constructor(page){
        this.page=page;
        this.manage = page.getByText('Manage', { exact: true });
        this.menu= page.getByRole('img', { name: 'menu' });
        this.logout= page.getByRole('button', { name: 'Sign out' });

    }

    async verifyManageOption(){
        await expect(this.manage).toBeVisible();
    }

    async logoutToApplication(){
        await this.menu.click();
        await this.logout.click();
    }
}
module.exports = HomePage;
