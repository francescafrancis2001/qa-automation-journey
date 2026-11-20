import { test, expect } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import booking from '../../test-data/booking.json';

test.use({
    baseURL: 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: { Accept: 'application/json' },
});

// Helper: log in and return a token
async function getToken(request: APIRequestContext): Promise<string> {
    const response = await request.post('/auth', {
        data: { username: 'admin', password: 'password123' },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    return body.token;
}

test('full booking CRUD flow @api', async ({ request }) => {
    test.setTimeout(60000);   // the free server can be slow to wake up

    const token = await getToken(request);
    const authHeaders = { Cookie: `token=${token}` };

    let bookingId = 0;
    let deleted = false;

    try {
        await test.step('Create a booking', async () => {
            const response = await request.post('/booking', { data: booking.create });
            console.log('create status:', response.status());
            expect(response.ok()).toBeTruthy();

            const body = await response.json();
            bookingId = body.bookingid;
            expect(bookingId).toBeTruthy();
            expect(body.booking.firstname).toBe(booking.create.firstname);
        });

        await test.step('Read it back and check it was saved', async () => {
            const response = await request.get(`/booking/${bookingId}`);
            expect(response.status()).toBe(200);
            expect(await response.json()).toEqual(booking.create);
        });

        await test.step('Update the booking', async () => {
            const response = await request.put(`/booking/${bookingId}`, {
                data: booking.update,
                headers: authHeaders,
            });
            expect(response.status()).toBe(200);

            const body = await response.json();
            expect(body.lastname).toBe(booking.update.lastname);
            expect(body.totalprice).toBe(booking.update.totalprice);
        });

        await test.step('Read it again and check the update was saved', async () => {
            const response = await request.get(`/booking/${bookingId}`);
            expect(response.status()).toBe(200);
            expect(await response.json()).toEqual(booking.update);
        });

        await test.step('Delete the booking', async () => {
            const response = await request.delete(`/booking/${bookingId}`, {
                headers: authHeaders,
            });
            expect(response.status()).toBe(201);   // this API returns 201 for delete
            deleted = true;
        });

        await test.step('Confirm the booking is gone', async () => {
            const response = await request.get(`/booking/${bookingId}`);
            expect(response.status()).toBe(404);
        });
    } finally {
        // Cleanup: if a step failed before the delete, remove the booking anyway
        if (bookingId && !deleted) {
            await request.delete(`/booking/${bookingId}`, { headers: authHeaders });
        }
    }

    // test('update without a token is rejected @api', async ({ request }) => {
    //     const response = await request.put('/booking/1', { data: booking.update });
    //     expect(response.status()).toBe(403);
    // });

    // test('getting a booking that does not exist returns 404 @api', async ({ request }) => {
    //     const response = await request.get('/booking/99999999');
    //     expect(response.status()).toBe(404);
    //     expect(await response.text()).toBe('Not Found');
    // });

});