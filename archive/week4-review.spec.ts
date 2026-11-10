import { test, expect } from '@playwright/test';

test('wait for the checkbox to be removed', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('#checkbox')).toBeHidden({ timeout: 15000 });
    await expect(page.locator('#message')).toHaveText("It's gone!");
});

test('prompt dialog, then a new tab', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');
        await dialog.accept('Playwright');
    });
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.locator('#result')).toHaveText('You entered: Playwright');

    await page.goto('https://the-internet.herokuapp.com/windows');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByRole('link', { name: 'Click Here' }).click(),
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/windows\/new/);
});

test('upload and download files', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('#file-upload').setInputFiles('tests/files/sample.txt');
    await page.locator('#file-submit').click();
    await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');

    await page.goto('https://the-internet.herokuapp.com/download');
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', { name: 'some-file.txt', exact: true }).click(),
    ]);
    expect(download.suggestedFilename()).toBe('some-file.txt');
});