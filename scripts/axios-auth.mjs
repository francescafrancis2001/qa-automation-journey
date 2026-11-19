import axios from 'axios';
import assert from 'node:assert/strict';

const api = axios.create({ baseURL: 'https://dummyjson.com', timeout: 10000 });

// 1. Log in
const login = await api.post('/auth/login', {
    username: 'emilys',
    password: 'emilyspass',
});
assert.equal(login.status, 200);

const token = login.data.accessToken;

// 2. Call a protected endpoint with the token
const me = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
});
assert.equal(me.status, 200);
assert.equal(me.data.username, 'emilys');

console.log('Auth flow OK for', me.data.username);


