import { test, expect } from './bookingFixtures';
import booking from '../../../test-data/booking.json';

test.describe('Booking API: negative cases', () => {
    test('update without a token is rejected @api @regression', async ({ bookingApi }) => {
        const response = await bookingApi.updateBooking(1, booking.update);
        expect(response.status()).toBe(403);
    });

    test('delete without a token is rejected @api @regression', async ({ bookingApi }) => {
        const response = await bookingApi.deleteBooking(1);
        expect(response.status()).toBe(403);
    });

    test('update with an invalid token is rejected @api @regression', async ({ request }) => {
        const { BookingApi } = await import('../../../api-clients/BookingApi');
        const api = new BookingApi(request, 'this-is-not-a-valid-token');
        const response = await api.updateBooking(1, booking.update);
        expect(response.status()).toBe(403);
    });

    test('a missing booking returns 404 @api @regression', async ({ bookingApi }) => {
        const response = await bookingApi.getBooking(99999999);
        expect(response.status()).toBe(404);
        expect(await response.text()).toBe('Not Found');   // plain text, not JSON
    });

    test('bad credentials return 200 but no token @api @regression', async ({ bookingApi }) => {
        const response = await bookingApi.login('admin', 'wrong');
        expect(response.status()).toBe(200);              // unconventional, see findings

        const body = await response.json();
        expect(body).not.toHaveProperty('token');
        expect(body).toHaveProperty('reason');
    });
});