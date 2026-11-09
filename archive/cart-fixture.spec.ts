import { test, expect } from './fixtures';

test('add one item', async ({ loggedInPage }) => {
    await loggedInPage.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(loggedInPage.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});

test('open the login page without logging in', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});


test('adds two items and checks the badge says 2', async ({ loggedInPage }) => {
    await loggedInPage.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await loggedInPage.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await expect(loggedInPage.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
});