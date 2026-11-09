import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Purchase', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        // create the page objects once, for every test
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        // login before every test
        await loginPage.gotoPage();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(inventoryPage.title).toHaveText('Products');
    });

    test('user can buy a product', async () => {
        await inventoryPage.addToCart('sauce-labs-backpack');
        await expect(inventoryPage.cartBadge).toHaveText('1');
        await inventoryPage.openCart();

        await expect(cartPage.cartItems).toContainText('Sauce Labs Backpack');
        await cartPage.checkout();

        await checkoutPage.fillInformation('Francesca', 'Test', '12345');
        await checkoutPage.finish();

        await expect(checkoutPage.confirmationMessage).toContainText('Thank you for your order!');
    });

    test('add two items then remove one', async () => {
        await inventoryPage.addToCart('sauce-labs-backpack');
        await inventoryPage.addToCart('sauce-labs-bike-light');
        await expect(inventoryPage.cartBadge).toHaveText('2');

        await inventoryPage.removeItem('sauce-labs-bike-light');
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await inventoryPage.openCart();
        await expect(cartPage.cartItems).toHaveCount(1);
        await expect(cartPage.cartItems).toContainText('Sauce Labs Backpack');
    });

    
});