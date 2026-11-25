import { test, expect } from './bookingFixtures';
import booking from '../../../test-data/booking.json';

test('full booking CRUD flow @api @smoke', async ({ authedBookingApi: api }) => {
    test.setTimeout(60000);   // the free server can be slow to wake up

    let bookingId = 0;
    let deleted = false;

    try {
        await test.step('Create a booking', async () => {
            const response = await api.createBooking(booking.create);
            expect(response.ok()).toBeTruthy();   // this API returns 200, not 201

            const body = await response.json();
            bookingId = body.bookingid;
            expect(bookingId).toBeTruthy();
            expect(body.booking.firstname).toBe(booking.create.firstname);
        });

        await test.step('Read it back and check it was saved', async () => {
            const response = await api.getBooking(bookingId);
            expect(response.status()).toBe(200);
            expect(await response.json()).toEqual(booking.create);
        });

        await test.step('Update the booking', async () => {
            const response = await api.updateBooking(bookingId, booking.update);
            expect(response.status()).toBe(200);
            expect((await response.json()).lastname).toBe(booking.update.lastname);
        });

        await test.step('Read it again and check the update was saved', async () => {
            const response = await api.getBooking(bookingId);
            expect(await response.json()).toEqual(booking.update);
        });

        await test.step('Delete the booking', async () => {
            const response = await api.deleteBooking(bookingId);
            expect(response.status()).toBe(201);   // this API returns 201 for delete
            deleted = true;
        });

        await test.step('Confirm the booking is gone', async () => {
            const response = await api.getBooking(bookingId);
            expect(response.status()).toBe(404);
        });
    } finally {
        if (bookingId && !deleted) {
            await api.deleteBooking(bookingId);   // cleanup if a step failed midway
        }
    }

});

test('a created booking appears in the filtered list @api', async ({ authedBookingApi: api }) => {
    const uniqueName = `Test${Date.now()}`;
    let bookingId = 0;

    try {
        const created = await api.createBooking({ ...booking.create, lastname: uniqueName });
        bookingId = (await created.json()).bookingid;

        const list = await api.listBookings({ lastname: uniqueName });
        expect(list.status()).toBe(200);

        const ids = (await list.json()).map((item: { bookingid: number }) => item.bookingid);
        expect(ids).toContain(bookingId);

    } finally {

        if (bookingId) await api.deleteBooking(bookingId);
    }
});