import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('valid user can log in', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);
    });

    test('wrong password shows an error', async () => {
        await loginPage.login('standard_user', 'wrong');
        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('empty username shows an error', async () => {
        await loginPage.login('', 'secret_sauce');
        await expect(loginPage.errorMessage).toContainText('Username is required');
    });
});