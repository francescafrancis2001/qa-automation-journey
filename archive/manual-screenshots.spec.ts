import { test, expect, Page } from '@playwright/test';

test('complete a purchase', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/cart.png' });                  // visible area
    await page.screenshot({ path: 'screenshots/full.png', fullPage: true });  // whole page
    await page.locator('[data-test= "inventory-item"]').first().screenshot({ path: 'screenshots/item.png' });  // one element

})

