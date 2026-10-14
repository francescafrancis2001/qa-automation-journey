import { test, expect } from '@playwright/test';

test('login and add item to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.getByLabel('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    
    await page.getByRole('combobox', { name: 'Sort products' }).selectOption('Price (low to high)');

});