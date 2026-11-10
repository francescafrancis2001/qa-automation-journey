import { test, expect } from './fixtures';

interface LoginCase {
    name: string;
    username: string;
    password: string;
    error: string;
}

const loginCases: LoginCase[] = [
    { name: 'empty username', username: '', password: 'secret_sauce', error: 'Username is required' },
    { name: 'empty password', username: 'standard_user', password: '', error: 'Password is required' },
    { name: 'wrong password', username: 'standard_user', password: 'wrong', error: 'do not match' },
    { name: 'locked out user', username: 'locked_out_user', password: 'secret_sauce', error: 'locked out' },
];

test.describe('Login failures @regression', () => {
    for (const c of loginCases) {
        test(`login fails: ${c.name}`, async ({ page }) => {
            await page.goto('/');
            await page.locator('[data-test="username"]').fill(c.username);
            await page.locator('[data-test="password"]').fill(c.password);
            await page.locator('[data-test="login-button"]').click();
            await expect(page.locator('[data-test="error"]')).toContainText(c.error);
            await expect(page).toHaveURL('/');
        });
    }
});

test.describe('Cart', () => {
    test.beforeEach(async ({ loggedInPage }) => {
        await loggedInPage.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await loggedInPage.locator('[data-test="shopping-cart-link"]').click();
        await expect(loggedInPage).toHaveURL(/cart/);
    });

    test('cart has one item @smoke', async ({ loggedInPage }) => {
        await expect(loggedInPage.locator('[data-test="inventory-item"]')).toHaveCount(1);
    });

    test('removing the item empties the cart', async ({ loggedInPage }) => {
        await loggedInPage.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await expect(loggedInPage.locator('[data-test="inventory-item"]')).toHaveCount(0);
    });
});