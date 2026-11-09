import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import users from '../test-data/users.json';
import loginErrors from '../test-data/loginErrors.json';

test.describe('Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.gotoPage();
    });

    test('valid user can log in @smoke', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(inventoryPage.title).toHaveText('Products');
    });

    for (const data of loginErrors) {
        test(`shows error for ${data.name} @regression`, async () => {
            await loginPage.login(data.username, data.password);
            await expect(loginPage.errorMessage).toContainText(data.error);
        });
    }
});