const { test } = require('@playwright/test');
const CoursePurchase = require("../pages/course-purchase.page");

test.use({ storageState: 'authState.json' });

const enrollmentAddress = process.env.ENROLL_ADDRESS;
const enrollmentPhone = process.env.ENROLL_PHONE;

test('courseEnroll', async ({ page }) => {
    await page.goto('/');

    const coursePurchase = new CoursePurchase(page);
    await coursePurchase.purchaseCourse(enrollmentAddress, enrollmentPhone);
});
