import { test, expect } from '@playwright/test';

test('dynamic loading: element hidden then rendered', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');
    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page.locator('#finish')).toHaveText('Hello World!', { timeout: 15000 });
});

test('dynamic controls: wait for element to be removed', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('#checkbox')).toBeHidden({ timeout: 15000 });
    await expect(page.locator('#message')).toHaveText("It's gone!");

});

test('dynamic controls: enable input and type', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    const input = page.getByRole('textbox');
    await expect(input).toBeDisabled();          // proves it starts disabled

    await page.getByRole('button', { name: 'Enable' }).click();

    await expect(input).toBeEnabled({ timeout: 15000 });
    await input.fill('hello');

    await expect(page.locator('#message')).toHaveText("It's enabled!");
});