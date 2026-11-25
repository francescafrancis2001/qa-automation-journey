import { test, expect } from './bookingFixtures';
import type { Booking } from '../../../api-clients/BookingApi';
import booking from '../../../test-data/booking.json';
import invalidCases from '../../../test-data/bookingInvalid.json';

test.describe('Booking API: validation', () => {
    for (const testCase of invalidCases) {
        test(`create fails when ${testCase.name} @api @regression`, async ({ bookingApi }) => {
            const data: Record<string, unknown> = { ...booking.create };
            delete data[testCase.field];

            const response = await bookingApi.createBooking(data as Booking);
            console.log(`${testCase.name}: status ${response.status()}`);

            expect(response.status()).toBe(testCase.expectedStatus);
        });
    }
});