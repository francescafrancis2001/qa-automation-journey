import { test, expect } from './fixtures';


interface CheckoutCase {
    name: string;
    firstName: string;
    lastName: string;
    zip: string;
    error: string;
}

const checkoutCases: CheckoutCase[] = [
    { name: 'missing first name', firstName: '', lastName: 'Khoury', zip: '1400', error: 'Error: First Name is required' },
    { name: 'missing last name', firstName: 'Sara', lastName: '', zip: '1400', error: 'Error: Last Name is required' },
    { name: 'missing zip code', firstName: 'Sara', lastName: 'Khoury', zip: '', error: 'Error: Postal Code is required' },
];


test.describe('Checkout validation @regression', () => {
    test.beforeEach(async ({ loggedInPage }) => {
        await loggedInPage.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await loggedInPage.locator('[data-test="shopping-cart-link"]').click();
        await loggedInPage.locator('[data-test="checkout"]').click();
        await expect(loggedInPage).toHaveURL(/checkout-step-one/);
    });

    for (const c of checkoutCases) {
        test(`checkout error: ${c.name}`, async ({ loggedInPage }) => {
            await loggedInPage.locator('[data-test="firstName"]').fill(c.firstName);
            await loggedInPage.locator('[data-test="lastName"]').fill(c.lastName);
            await loggedInPage.locator('[data-test="postalCode"]').fill(c.zip);
            await loggedInPage.locator('[data-test="continue"]').click();
            await expect(loggedInPage.locator('[data-test="error"]')).toHaveText(c.error);
            await expect(loggedInPage).toHaveURL(/checkout-step-one/);


        });
    }

    test('first name with only a space is accepted (possible validation gap)', async ({ loggedInPage }) => {
        await loggedInPage.locator('[data-test="firstName"]').fill(' ');
        await loggedInPage.locator('[data-test="lastName"]').fill('Khoury');
        await loggedInPage.locator('[data-test="postalCode"]').fill('1400');
        await loggedInPage.locator('[data-test="continue"]').click();
        await expect(loggedInPage).toHaveURL(/checkout-step-two/);
    });

});

test('logged-in user sees 6 products @smoke', async ({ loggedInPage }) => {
    await expect(loggedInPage.locator('[data-test="inventory-item"]')).toHaveCount(6);
})




