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
        await test.step('Add the backpack to the cart', async () => {
            await inventoryPage.addToCart(products.backpack.id);
            await expect(inventoryPage.cartBadge).toHaveText('1');
        });

        await test.step('Open the cart and verify the item', async () => {
            await inventoryPage.openCart();
            await expect(cartPage.cartItems).toContainText(products.backpack.name);
        });

        await test.step('Fill checkout information', async () => {
            await cartPage.checkout();
            await checkoutPage.fillInformation(checkout.firstName, checkout.lastName, checkout.postalCode);
        });

        await test.step('Finish the order and verify confirmation', async () => {
            await checkoutPage.finish();
            await expect(checkoutPage.confirmationMessage).toContainText('Thank you for your order!');
        });
    });


    test('add two items then remove one', async () => {
        await test.step('Add two items to cart and check the cart budge', async () => {
            await inventoryPage.addToCart(products.backpack.id);
            await inventoryPage.addToCart(products.bikeLight.id);
            await expect(inventoryPage.cartBadge).toHaveText('2');

        });

        await test.step('Remove one item and check the cart budge', async () => {
            await inventoryPage.removeItem(products.bikeLight.id);
            await expect(inventoryPage.cartBadge).toHaveText('1');
        });

        await test.step('Open the cart and verify only the backpack remains', async () => {
            await inventoryPage.openCart();
            await expect(cartPage.cartItems).toHaveCount(1);
            await expect(cartPage.cartItems).toContainText(products.backpack.name);
        });
    });



});