import { test, expect } from '@playwright/test';

// test.describe('Cart', () => {
//     test('add one item', async ({ page }) => { /* go to page, add to cart... expected result*/ });
//     test('add two items', async ({ page }) => { /* go to page, add to cart... expected result */ });
// });


// test.only('focus on this one', ...)   // runs only this test (never commit it)
// test.skip('not ready yet', ...)       // skipped, shows as skipped in the report
// test('known bug', async ({ page }) => {
//   test.fail();                        // expected to fail; passes if it does
// });


// await test.step('Open the cart', async () => {  //Steps appear as named sections in the trace and report.
//   await page.locator('[data-test="shopping-cart-link"]').click();
//   await expect(page).toHaveURL(/cart/);
// });


test.describe('Cart', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await expect(page).toHaveURL(/inventory/);
    });

    test('add one item', async ({ page }) => {          // test.skip('add one item', async ({ page }) => {...}   this test will skipped when i run it
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    });

    test('add two items', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('2');

        await test.step('Open the cart', async () => {
            await page.locator('[data-test="shopping-cart-link"]').click();
            await expect(page).toHaveURL(/cart/);
        });

    });

    test('remove an item after adding it', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('1');
        await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toHaveText('Remove');

        await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden();    //cart counting number is null empty
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toHaveText('Add to cart');

    });



});

