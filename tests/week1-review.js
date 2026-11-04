

// question 1
function getStatus(product) {
    if (inStock == true) {
        return '${products.name}: In stock';
    }
    else {
        return '${products.name}: Out of stock';
    }
}

getStatus(true);
getStatus(false);


const products = [
    { name: "Backpack", price: 29.99, inStock: true },
    { name: "Bike Light", price: 9.99, inStock: false },
    { name: "T-Shirt", price: 15.99, inStock: true },
    { name: "Jacket", price: 49.99, inStock: true },
];

// question 2

function getAffordable(products, budget) {
    if (inStock == true && price <= $badget) {
        return '${products.name}';

    } else {
        return '${products.name}';
    }

}

// question 3

for (const status of products) {
    return '${products.inStock}';
}


// question 4
getAffordable(products, 20)


// question 5
async function fakeLoad() {
    console.log("Start");
    const result = await waitonesecond();
    console.log("loaded");
}
return fakeLoad;

// question 6

function returnlastname() {
    return '${products.name}';
}
products(products.legth - 1).name
