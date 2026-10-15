import { test, expect } from '@playwright/test';

test('login success shows products', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden();
});

test('wrong password shows error', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});



test('Add 2 items to cart and Check the counting number', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();


    await expect(page).toHaveURL(/inventory/);
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');


    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);

});




test('add 3 items and see them in the cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory/);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(3);
});