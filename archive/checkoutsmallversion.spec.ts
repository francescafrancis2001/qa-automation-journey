import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory/);
}

async function goToCheckoutWithTwoItems(page: Page) {
    await login(page);
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one/);
}

test('complete a purchase', async ({ page }) => {
    await goToCheckoutWithTwoItems(page);

    await page.getByPlaceholder('First Name').fill('Test first name');
    await page.getByPlaceholder('Last Name').fill('Test last name');
    await page.getByPlaceholder('Zip/Postal Code').fill('1400 post 200');
    await page.getByRole('button', { name: 'continue' }).click();
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);

    await page.getByRole('button', { name: 'finish' }).click();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
});

test('checkout shows an error when first name is empty', async ({ page }) => {
    await goToCheckoutWithTwoItems(page);

    await page.getByPlaceholder('Last Name').fill('Test last name');
    await page.getByPlaceholder('Zip/Postal Code').fill('1400 post 200');
    await page.getByRole('button', { name: 'continue' }).click();

    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
    //await expect(page.locator('[data-test="error"]')).toContainText('Error:” prefix won’t break the test');  //failed test
    await expect(page).toHaveURL(/checkout-step-one/);
});