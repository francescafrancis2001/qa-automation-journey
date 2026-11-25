import { test as base } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';

type WorkerFixtures = { authApi: APIRequestContext };

export const test = base.extend<{}, WorkerFixtures>({


    authApi: [async ({ playwright }, use) => {
        // 1. log in with a temporary client
        const anonymous = await playwright.request.newContext({
            baseURL: 'https://dummyjson.com',
        });
        const login = await anonymous.post('/auth/login', {
            data: { username: 'emilys', password: 'emilyspass' },
        });
        const { accessToken } = await login.json();
        await anonymous.dispose();

        // 2. create the real client, which sends the token on every request
        const api = await playwright.request.newContext({
            baseURL: 'https://dummyjson.com',
            extraHTTPHeaders: { Authorization: `Bearer ${accessToken}` },
        });

        await use(api);        // the test runs here
        await api.dispose();   // cleanup afterwards
    },
    { scope: 'worker' }],

});

export { expect } from '@playwright/test';