import { test, expect } from '@playwright/test';

// open new tab or window   (this page is external from the current page, so i want to write this code before page code, same as dialog)



test('open a new tab', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),                 // listen before the click, or the new tab can be missed
        page.getByRole('link', { name: 'Click Here' }).click(),   // the click that opens it
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/windows\/new/);

})


// upload a file 

test('upload sample.txt', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');


    //await page.locator('#file-upload').setInputFiles(['tests/files/sample.txt', 'tests/files/my-document.docx',]);   // if upload file accept multiple files
    // await page.locator('#file-upload').setInputFiles('C:\\Users\\user\\Desktop\\my-document.docx');    // write a correct laptop path  -- if \\ didn't work, so replace it with on /  --> C:/Users/user/Desktop/my-document.docx

    await page.locator('#file-upload').setInputFiles('tests/files/sample.txt');   //for single file
    await page.locator('#file-submit').click();
    await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');

})


test('upload a second file with a different name', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('#file-upload').setInputFiles('tests/files/second-sample.txt');
    await page.locator('#file-submit').click();
    await expect(page.locator('#uploaded-files')).toHaveText('second-sample.txt');
});

test('download a file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', { name: 'some-file.txt', exact: true }).click(),    // we put exact: true because i have 2 files that contain this name, and i can download only one file, so that i put exact: true, so here it search only for the file that has this name: some-file.txt
    ]);
    expect(download.suggestedFilename()).toBe('some-file.txt');
    await download.saveAs('downloads/' + download.suggestedFilename());
});