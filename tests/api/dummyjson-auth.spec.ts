import { test, expect } from './fixtures';

test.use({ baseURL: 'https://dummyjson.com' });

test('authenticated client can read the current user @api', async ({ authApi }) => {
    const response = await authApi.get('/auth/me');

    expect(response.status()).toBe(200);
    expect((await response.json()).username).toBe('emilys');
});

test('a request with no token is rejected @api', async ({ request }) => {
    const response = await request.get('/auth/me');
    console.log('status without token:', response.status());
    expect(response.status()).toBe(401);
});

test('a request with an invalid token is rejected @api', async ({ request }) => {
    const response = await request.get('/auth/me', {
        headers: { Authorization: 'Bearer this-is-not-a-valid-token' },
    });
    expect(response.status()).toBe(401);
});