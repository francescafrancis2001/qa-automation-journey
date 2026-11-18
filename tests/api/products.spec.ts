import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://dummyjson.com' });

test.describe('Products API', () => {
    test('GET /products returns a paged list @api', async ({ request }) => {
        const response = await request.get('/products', {
            params: { limit: 5, skip: 0 },
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.products).toHaveLength(5);
        expect(body.limit).toBe(5);
        expect(body.skip).toBe(0);
        expect(typeof body.total).toBe('number');
    });

    test('GET /products/1 returns one product @api', async ({ request }) => {
        const response = await request.get('/products/1');

        await expect(response).toBeOK();
        expect(response.headers()['content-type']).toContain('application/json');

        const body = await response.json();
        expect(body.id).toBe(1);
        expect(typeof body.title).toBe('string');
        expect(typeof body.price).toBe('number');
    });

    test('GET /products/search finds products @api', async ({ request }) => {
        const response = await request.get('/products/search', {
            params: { q: 'phone' },
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(Array.isArray(body.products)).toBe(true);
        expect(body.total).toBeGreaterThan(0);
    });


    test('POST /products/add creates a product @api', async ({ request }) => {
        const response = await test.step('Send the POST request', async () => {
            return await request.post('/products/add', {
                data: { title: 'My test product', price: 99 },
            });
        });

        await test.step('Check the response', async () => {
            expect(response.status()).toBe(201);

            const body = await response.json();
            expect(body.title).toBe('My test product');
            expect(body.price).toBe(99);
            expect(body).toHaveProperty('id');
        });
    });



    test('GET a missing product returns 404 @api', async ({ request }) => {
        const response = await request.get('/products/99999');

        expect(response.status()).toBe(404);

        const body = await response.json();
        expect(body.message).toContain('99999');
    });
});


test('PUT /products/1 with data @api', async ({ request }) => {
    const response = await request.put('/products/1', { data: { title: 'Update title' }, });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Update title');

});


test('DELETE /products/1 removes a product @api', async ({ request }) => {
    const response = await request.delete('/products/1');

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);
    expect(body.isDeleted).toBe(true);
});


test('GET /products/1 responds in under 2 seconds @api', async ({ request }) => {
    const start = Date.now();
    const response = await request.get('/products/1');
    const elapsed = Date.now() - start;

    console.log(`Response time: ${elapsed} ms`);

    expect(response.status()).toBe(200);
    expect(elapsed).toBeLessThan(2000);
});




//npx playwright test tests/api --project=chromium
//npx playwright show-report
// npx playwright test --grep "@api" --project=chromium                --> to run only the API tests by tag in PowerShell