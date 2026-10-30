import { test as base, expect, Page } from '@playwright/test';

// type MyFixtures = {
//     loggedInPage: Page;
// };


type MyFixtures = {
    loggedInPage: Page;
    user: { username: string; password: string };
};


export const test = base.extend<MyFixtures>({
    // user: async ({ }, use) => {        //i write the credential manually
    //     await use({ username: 'standard_user', password: 'secret_sauce' });
    // },
    user: async ({ }, use) => {
        await use({ username: process.env.APP_USER!, password: process.env.APP_PASSWORD! });   // i get the credentails deoend on test environment dev or staging
    },


    loggedInPage: async ({ page, user }, use) => {
        await page.goto('/')
        await page.locator('[data-test="username"]').fill(user.username);
        await page.locator('[data-test="password"]').fill(user.password);
        await page.locator('[data-test="login-button"]').click();
        await expect(page).toHaveURL(/inventory/);

        await use(page);   // hand the logged-in page to the test

        // console.log('cleanup'); Why cleanup prints after each test: everything before await use(page) is setup, the test runs while use is waiting, and everything after it runs when the test finishes. Cleanup code (deleting test data, logging out) goes there.
    },

});

export { expect };



//A fixture is shared across every file. A beforeEach stays in one file or group.
// A fixture runs only for tests that ask for it, as your three-test run just proved.
// A fixture can have cleanup code and depend on other fixtures.
// Use beforeEach for simple setup inside one file, and a fixture when several files need it, or only some tests do.
