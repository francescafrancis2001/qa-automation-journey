class Product {
    constructor(public name: string, public price: number, public inStock: boolean) { }

    isAffordable(budget: number): boolean {
        return this.price <= budget;
    }

    getStatus(): string {
        if (this.inStock === true) {
            return "In stock";
        } else {
            return "Out of stock";
        }
    }
}

const product1 = new Product("Laptop", 800, true);
const product2 = new Product("Phone", 400, false);

console.log(`${product1.name}: ${product1.getStatus()}`);
console.log(`${product2.name}: ${product2.getStatus()}`);
console.log(product1.isAffordable(1000));
console.log(product2.isAffordable(300));