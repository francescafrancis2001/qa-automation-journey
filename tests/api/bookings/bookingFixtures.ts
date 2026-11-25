import { test as base, expect } from '@playwright/test';
import { BookingApi } from '../../../api-clients/BookingApi';

type Fixtures = {
    bookingApi: BookingApi;        // anonymous client
    authedBookingApi: BookingApi;  // logged-in client
};

export const test = base.extend<Fixtures>({
    bookingApi: async ({ request }, use) => {
        await use(new BookingApi(request));
    },

    authedBookingApi: async ({ request }, use) => {
        const anonymous = new BookingApi(request);
        const response = await anonymous.login(
            process.env.BOOKER_USER ?? 'admin',
            process.env.BOOKER_PASSWORD ?? 'password123'
        );
        expect(response.status()).toBe(200);

        const { token } = await response.json();
        expect(token).toBeTruthy();

        await use(new BookingApi(request, token));
    },
});

export { expect };