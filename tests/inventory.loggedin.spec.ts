import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import products from '../test-data/products.json';

test('logged-in user sees 6 products @smoke', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.inventory_item')).toHaveCount(6);
});

test('logged-in user can add an item @smoke', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await page.goto('https://www.saucedemo.com/inventory.html');
    await inventoryPage.addToCart(products.backpack.id);
    await expect(inventoryPage.cartBadge).toHaveText('1');
});