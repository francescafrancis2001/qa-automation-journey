import { test, expect } from '@playwright/test';

test('accept a JS alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        await dialog.accept();               //if i remove page.once('dialog',....) then i run the test, the test is passed because playwright passes the test because an alert has only one button, OK, so auto-dismissing it gives the same result as accepting it, and the page still shows “You successfully clicked an alert"
    });
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
});


test('accept a JS confirm', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
        await dialog.accept();   //if i remove page.once('dialog',....) then i run the test, the test is failed because in this popup, i have 2 buttons 'ok' and 'cancel'. With no dialog handler, Playwright auto-dismissed the confirm, which presses Cancel, so the page showed a different result than the test expected.
    });
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
});


test('dismiss a JS confirm', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
        await dialog.dismiss();
    });
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
});

test('accept and fill JS Prompt', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');
        await dialog.accept('Playwright');      // types the text, then clicks OK
    });

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.locator('#result')).toHaveText('You entered: Playwright');
});


test('type inside an iframe', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    const frame = page.frameLocator('#mce_0_ifr');
    await frame.locator('#tinymce').fill('Hello from Playwright');
    await expect(frame.locator('#tinymce')).toHaveText('Hello from Playwright');
});

