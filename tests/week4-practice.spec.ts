import { test, expect } from '@playwright/test';

test('remove checkbox, then handle a confirm dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('#checkbox')).toBeHidden({ timeout: 15000 });
    await expect(page.locator('#message')).toHaveText("It's gone!");

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        await dialog.dismiss();
    });
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
});


test('click ok in confirm dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
});


test('open a new tab and read its content', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByRole('link', { name: 'Click Here' }).click(),
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/windows\/new/);
    await expect(newPage.getByRole('heading')).toHaveText('New Window');

    await page.bringToFront();
    await expect(page).toHaveURL(/windows$/);
});


test('upload a file, then download one', async ({ page }) => {
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
    await download.saveAs('downloads/' + download.suggestedFilename());
});



test('upload a new file second-sample.txt', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('#file-upload').setInputFiles('tests/files/second-sample.txt');
    await page.locator('#file-submit').click();
    await expect(page.locator('#uploaded-files')).toHaveText('second-sample.txt');

});