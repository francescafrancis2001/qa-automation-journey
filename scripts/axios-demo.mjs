import axios from 'axios';


// const response = await axios.get('https://dummyjson.com/products/1');

// console.log(response.status);
// console.log(response.data.title);


const base = 'https://dummyjson.com';

// GET with query parameters
const list = await axios.get(`${base}/products`, { params: { limit: 5, skip: 0 } });
console.log('list:', list.status, list.data.products.length);

// POST: the body is the 2nd argument
const created = await axios.post(`${base}/products/add`, {
    title: 'My test product',
    price: 99,
});
console.log('create:', created.status, created.data.id);

// PUT: the body is the 2nd argument
const updated = await axios.put(`${base}/products/1`, { title: 'Updated title' });
console.log('update:', updated.status, updated.data.title);

// DELETE: no body
const deleted = await axios.delete(`${base}/products/1`);
console.log('delete:', deleted.status);




try {
    await axios.get('https://dummyjson.com/products/99999');
} catch (error) {
    if (axios.isAxiosError(error)) {
        console.log(error.response.status);   // 404
        console.log(error.response.data);     // { message: "Product with id '99999' not found" }
    } else {
        throw error;
    }
}



// try { ... } catch (error) { ... } runs the code, and if it throws, jumps to catch.
// The server’s reply is inside error.response (status and data).
// axios.isAxiosError(error) checks that the error came from axios and not something else.



//If you’d rather get the response without exceptions, like Playwright, tell axios that every status is acceptable:


const response = await axios.get('https://dummyjson.com/products/99999', { validateStatus: () => true });
console.log(response.status);





const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000,   // fail if there is no answer after 10 seconds
});

const responses = await api.get('/products/1');
