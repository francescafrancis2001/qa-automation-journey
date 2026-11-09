import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import users from '../test-data/users.json';
import products from '../test-data/products.json';
import checkout from '../test-data/checkout.json';
import checkoutErrors from '../test-data/checkoutErrors.json';

test.describe('Checkout', () => {
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.gotoPage();
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.addToCart(products.backpack.id);
        await inventoryPage.openCart();
    });

    test('complete a purchase @smoke', async () => {
        await test.step('Go to checkout and fill information', async () => {
            await cartPage.checkout();
            await checkoutPage.fillInformation(checkout.firstName, checkout.lastName, checkout.postalCode);
        });

        await test.step('Finish and verify confirmation', async () => {
            await checkoutPage.finish();
            await expect(checkoutPage.confirmationMessage).toContainText('Thank you for your order!');
        });
    });

    for (const data of checkoutErrors) {
        test(`shows error for ${data.name} @regression`, async () => {
            await cartPage.checkout();
            await checkoutPage.fillInformation(data.firstName, data.lastName, data.postalCode);
            await expect(checkoutPage.errorMessage).toHaveText(data.error);
        });
    }
});