//import { test, expect } from '@playwright/test';
import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill(process.env.APP_USER!);
    await page.locator('[data-test="password"]').fill(process.env.APP_PASSWORD!);

    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory/);
}

async function goToCheckoutWithTwoItems(page: Page) {
    await login(page);
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one/);
}


test('complete a purchase', async ({ page }) => {
    await login(page);
    // await page.goto('https://www.saucedemo.com');
    // await page.locator('[data-test="username"]').fill('standard_user');
    // await page.locator('[data-test="password"]').fill('secret_sauce');
    // await page.locator('[data-test="login-button"]').click();
    // await expect(page).toHaveURL(/inventory/);

    // add 2 items, assert the badge is '2'

    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');


    // open the cart, assert the URL and 2 items listed

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);


    // click Checkout, assert the URL contains 'checkout-step-one'
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one/);


    // fill first name, last name, postal code, click Continue
    // assert the URL contains 'checkout-step-two'

    await page.getByPlaceholder('First Name').fill('Test first name');
    await page.getByPlaceholder('Last Name').fill('Test last name');
    await page.getByPlaceholder('Zip/Postal Code').fill('1400 post 200');

    await page.getByRole('button', { name: 'continue' }).click();
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);


    // click Finish, assert the URL contains 'checkout-complete'
    // assert the confirmation header has the text 'Thank you for your order!'

    await page.getByRole('button', { name: "finish" }).click();
    await expect(page).toHaveURL(/checkout-complete/);

    await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');


});

// write the same test in another method


test('complete a purchase (another written type) @smoke', async ({ page }) => {
    await goToCheckoutWithTwoItems(page);


    // fill first name, last name, postal code, click Continue
    // assert the URL contains 'checkout-step-two'

    await page.getByPlaceholder('First Name').fill('Test first name');
    await page.getByPlaceholder('Last Name').fill('Test last name');
    await page.getByPlaceholder('Zip/Postal Code').fill('1400 post 200');

    await page.getByRole('button', { name: 'continue' }).click();
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);


    // click Finish, assert the URL contains 'checkout-complete'
    // assert the confirmation header has the text 'Thank you for your order!'

    await page.getByRole('button', { name: "finish" }).click();
    await expect(page).toHaveURL(/checkout-complete/);

    await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');


});


test('checkout shows an error when first name is empty', async ({ page }) => {
    await login(page);

    // await page.goto('https://www.saucedemo.com');
    // await page.locator('[data-test="username"]').fill('standard_user');
    // await page.locator('[data-test="password"]').fill('secret_sauce');
    // await page.locator('[data-test="login-button"]').click();
    // await expect(page).toHaveURL(/inventory/);

    // add 2 items, assert the badge is '2'

    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');


    // open the cart, assert the URL and 2 items listed

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart/);
    // await page.screenshot({ path: 'screenshots/cart.png', fullPage: true }); if i want to take a screenshots
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);



    // click Checkout, assert the URL contains 'checkout-step-one'
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one/);


    // fill first name, last name, postal code, click Continue
    // assert the URL contains 'checkout-step-two'

    //await page.getByPlaceholder('First Name').fill('Test first name');
    await page.getByPlaceholder('Last Name').fill('Test last name');
    await page.getByPlaceholder('Zip/Postal Code').fill('1400 post 200');

    await page.getByRole('button', { name: 'continue' }).click();
    await expect(page.locator('[data-test="error"]')).toContainText("Error: First Name is required");



});



test('checkout shows an error when first name is empty (Written in another way)', async ({ page }) => {
    await goToCheckoutWithTwoItems(page);

    // fill first name, last name, postal code, click Continue
    // assert the URL contains 'checkout-step-two'

    //await page.getByPlaceholder('First Name').fill('Test first name');
    await page.getByPlaceholder('Last Name').fill('Test last name');
    await page.getByPlaceholder('Zip/Postal Code').fill('1400 post 200');

    await page.getByRole('button', { name: 'continue' }).click();
    await expect(page.locator('[data-test="error"]')).toContainText("Error: First Name is required");



});