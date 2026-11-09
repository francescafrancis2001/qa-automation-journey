import { test, expect } from '@playwright/test';



test('sort products by price', async ({ page }) => {

    await page.goto('https://www.saucedemo.com', { waitUntil: 'domcontentloaded' });
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('combobox', { name: 'Sort products' }).selectOption('Price (low to high)');
    await expect(page.locator('[data-test="inventory-item-price"]').first()).toHaveText('$7.99');

    await page.getByRole('combobox', { name: 'Sort products' }).selectOption('Name (Z to A)');
    await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText('Test.allTheThings() T-Shirt (Red)');


});


test('hover shows caption', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers', { waitUntil: 'commit' });
    await page.locator('.figure').first().hover();
    await expect(page.getByText('name: user1')).toBeVisible();
});

test('keyboard press', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');
    await page.locator('#target').press('A');
    await expect(page.locator('#result')).toHaveText('You entered: A');
});

test('checkboxes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes', { waitUntil: 'commit' });
    await page.locator('input[type="checkbox"]').first().check();
    await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();
});

test('click vs check', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes', { waitUntil: 'commit' });
    await page.locator('input[type="checkbox"]').nth(1).click();
    await expect(page.locator('input[type="checkbox"]').nth(1)).not.toBeChecked();
});