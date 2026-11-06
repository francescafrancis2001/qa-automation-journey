import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import users from '../test-data/users.json';
import checkout from '../test-data/checkout.json';
import products from '../test-data/products.json';

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
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(inventoryPage.title).toHaveText('Products');
    });

    test('user can buy a product', async () => {
        await inventoryPage.addToCart(products.backpack.id);
        await expect(inventoryPage.cartBadge).toHaveText('1');
        await inventoryPage.openCart();

        await expect(cartPage.cartItems).toContainText(products.backpack.name);
        await cartPage.checkout();

        await checkoutPage.fillInformation(checkout.firstName, checkout.lastName, checkout.postalCode);
        await checkoutPage.finish();

        await expect(checkoutPage.confirmationMessage).toContainText('Thank you for your order!');
    });

    test('add two items then remove one', async () => {
        await inventoryPage.addToCart(products.backpack.id);
        await inventoryPage.addToCart(products.bikeLight.id);
        await expect(inventoryPage.cartBadge).toHaveText('2');

        await inventoryPage.removeItem(products.bikeLight.id);
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await inventoryPage.openCart();
        await expect(cartPage.cartItems).toHaveCount(1);
        await expect(cartPage.cartItems).toContainText(products.backpack.name);
    });
});