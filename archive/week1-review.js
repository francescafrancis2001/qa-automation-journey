const products = [
    { name: "Backpack", price: 29.99, inStock: true },
    { name: "Bike Light", price: 9.99, inStock: false },
    { name: "T-Shirt", price: 15.99, inStock: true },
    { name: "Jacket", price: 49.99, inStock: true },
];

function getStatus(product) {
    if (product.inStock) {
        return `${product.name}: In stock`;
    } else {
        return `${product.name}: Out of stock`;
    }
}

function getAffordable(products, budget) {
    const names = [];
    for (const product of products) {
        if (product.inStock && product.price <= budget) {
            names.push(product.name);
        }
    }
    return names;
}

for (const product of products) {
    console.log(getStatus(product));
}

console.log(getAffordable(products, 20));        // [ 'T-Shirt' ]

async function fakeLoad() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "loaded";
}

async function main() {
    const result = await fakeLoad();
    console.log(result);                           // prints after 1 second
}
main();

console.log(products[products.length - 1].name); // Jacket