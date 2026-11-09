import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import users from '../test-data/users.json';
import products from '../test-data/products.json';

test.describe('Cart', () => {
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        await loginPage.gotoPage();
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(inventoryPage.title).toHaveText('Products');
    });

    test('add one item to the cart @smoke', async () => {
        await test.step('Add the backpack', async () => {
            await inventoryPage.addToCart(products.backpack.id);
            await expect(inventoryPage.cartBadge).toHaveText('1');
        });

        await test.step('Verify it is in the cart', async () => {
            await inventoryPage.openCart();
            await expect(cartPage.cartItems).toHaveCount(1);
            await expect(cartPage.cartItems).toContainText(products.backpack.name);
        });
    });

    test('add two items then remove one @regression', async () => {
        await test.step('Add two items', async () => {
            await inventoryPage.addToCart(products.backpack.id);
            await inventoryPage.addToCart(products.bikeLight.id);
            await expect(inventoryPage.cartBadge).toHaveText('2');
        });

        await test.step('Remove the bike light', async () => {
            await inventoryPage.removeItem(products.bikeLight.id);
            await expect(inventoryPage.cartBadge).toHaveText('1');
        });

        await test.step('Verify only the backpack remains', async () => {
            await inventoryPage.openCart();
            await expect(cartPage.cartItems).toHaveCount(1);
            await expect(cartPage.cartItems).toContainText(products.backpack.name);
        });
    });
});