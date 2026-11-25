import type { APIRequestContext, APIResponse } from '@playwright/test';

export type Booking = {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: { checkin: string; checkout: string };
    additionalneeds?: string;
};

export class BookingApi {
    readonly request: APIRequestContext;
    readonly token: string | undefined;
    readonly baseUrl: string;

    constructor(request: APIRequestContext, token?: string) {
        this.request = request;
        this.token = token;
        this.baseUrl = process.env.BOOKER_URL ?? 'https://restful-booker.herokuapp.com';
    }

    // Headers sent on every call. The token is sent as a cookie, as this API expects.
    private headers(): Record<string, string> {
        const headers: Record<string, string> = { Accept: 'application/json' };
        if (this.token) {
            headers.Cookie = `token=${this.token}`;
        }
        return headers;
    }

    login(username: string, password: string): Promise<APIResponse> {
        return this.request.post(`${this.baseUrl}/auth`, {
            data: { username, password },
            headers: { Accept: 'application/json' },
        });
    }

    listBookings(params?: Record<string, string>): Promise<APIResponse> {
        return this.request.get(`${this.baseUrl}/booking`, {
            params,
            headers: this.headers(),
        });
    }

    createBooking(data: Booking): Promise<APIResponse> {
        return this.request.post(`${this.baseUrl}/booking`, { data, headers: this.headers() });
    }

    getBooking(id: number): Promise<APIResponse> {
        return this.request.get(`${this.baseUrl}/booking/${id}`, { headers: this.headers() });
    }

    updateBooking(id: number, data: Booking): Promise<APIResponse> {
        return this.request.put(`${this.baseUrl}/booking/${id}`, { data, headers: this.headers() });
    }

    deleteBooking(id: number): Promise<APIResponse> {
        return this.request.delete(`${this.baseUrl}/booking/${id}`, { headers: this.headers() });
    }
}