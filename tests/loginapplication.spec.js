// /tests/loginapplication.spec.js
// @ts-check
const { test, expect } = require('@playwright/test');
const HomePage = require("../pages/homepage");
const AddToCart = require("../pages/addtocart");

test('Login to Application and Add Items to Cart', async ({ page }) => {
  const homepage = new HomePage(page);
  const addtocart = new AddToCart(page);

  // Verify the manage option is visible after login
  await homepage.verifyManageOption();

  // Add items to the cart and verify the total price
  await addtocart.CartCourse();
  await addtocart.verifyTotalPrice();

  // Optionally, logout (if needed for cleanup)
  await homepage.logoutFromApplication();
});
