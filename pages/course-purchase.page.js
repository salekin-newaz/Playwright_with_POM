const { expect } = require('@playwright/test');
class CoursePurchase{
    constructor(page){
        this.page = page;
        this.firstcourse= page.locator("(//button[normalize-space()='Add to Cart'])[1]");
        this.secondcourse= page.locator("(//button[normalize-space()='Add to Cart'])[2]");
        this.cart= page.locator('.cartBtn');
        this.enrollBtn= page.getByRole('button', { name: 'Enroll Now' });
        this.address= page.locator('#address');
        this.phone= page.locator('#phone');
        this.enrollCourse= page.getByRole('dialog').getByRole('button', { name: 'Enroll Now' });
        this.closeBtn= page.getByRole('button', { name: 'Close' });

    }

    async purchaseCourse(address, phone){
        await this.firstcourse.click();
        await this.secondcourse.click();
        await expect(this.cart).toContainText('2');
        await this.cart.click();
        await expect(this.enrollBtn).toBeVisible();
        await this.enrollBtn.click();
        await expect(this.address).toBeVisible();
        await this.address.fill(address);
        await this.phone.fill(phone);
        await this.enrollCourse.click();
        await expect(this.closeBtn).toBeVisible();
        await this.closeBtn.click();

    }





}

module.exports = CoursePurchase;
