import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginErrors from '../test-data/loginErrors.json';

test.describe('Login errors', () => {
    for (const data of loginErrors) {
        test(`shows error for ${data.name}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.gotoPage();
            await loginPage.login(data.username, data.password);
            await expect(loginPage.errorMessage).toContainText(data.error);
        });
    }
});