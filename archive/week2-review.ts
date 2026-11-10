interface Product {
    name: string;
    price: number;
    inStock: boolean;
}

class Cart {
    private items: Product[] = [];

    add(product: Product): void {
        this.items.push(product);
    }

    count(): number {
        return this.items.length;
    }

    total(): number {
        let sum = 0;
        for (const item of this.items) {
            sum += item.price;
        }
        return sum;
    }

    names(): string[] {
        const result: string[] = [];
        for (const item of this.items) {
            result.push(item.name);
        }
        return result;
    }
}

const cart = new Cart();
// cart.add({ name: "product 1", price: 10, inStock: true });           //i need it but i comment them because i get an error message
// cart.add({ name: "product 2", price: 20, inStock: false });
// cart.add({ name: "product 3", price: 30, inStock: true });

console.log(cart.count());   // 3
console.log(cart.total());   // 60
console.log(cart.names());   // [ 'product 1', 'product 2', 'product 3' ]

// Deliberate error:
// cart.add({ name: "bad", price: "20", inStock: true });
// Error: Type 'string' is not assignable to type 'number'.