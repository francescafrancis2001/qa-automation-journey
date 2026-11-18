import { test, expect } from '@playwright/test';
test.use({ baseURL: 'https://dummyjson.com' });          //Why in the file and not in playwright.config.ts? Your config’s baseURL serves your UI tests (saucedemo). Setting it in the API spec file only affects that file, so the two don’t clash.


test('GET one product', async ({ request }) => {
    const response1 = await request.get('/products/1');
    const responseget = await request.get('/products', { params: { limit: 5, skip: 0 }, });     // ---> Query parameters:  /products?limit=5&skip=0
    const responseadd = await request.post('/products/add', { data: { title: 'My test product', price: 99 }, });          // --> Sending JSON
    const authresponse = await request.get('/auth/me', { headers: { Authorization: 'Bearer <token>' }, });

    expect(response1.status()).toBe(200);

    const body = await response1.json();
    console.log(body.title);
});




test('GET a failed test', async ({ request }) => {
    const response = await request.get('/products/99999');
    expect(response.status()).toBe(404);
});






// { request } gives you an API client for this test.
// await request.get(url) sends a GET and waits for the response.
// response.status() gives the status code.
// await response.json() reads the body as an object, like pm.response.json() in Postman.
// expect(...).toBe(200) is the same expect you already use in the UI tests.