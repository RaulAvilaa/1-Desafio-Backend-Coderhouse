

class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        if (this.products.some(existingProduct => existingProduct.code === product.code)) {
            console.error("Ya existe un producto con el mismo código.");
            return;
        }

        product.id = this.productIdCounter++;
        this.products.push(product);
        console.log("Producto agregado:", product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado.");
        }
    }
}

const productManager = new ProductManager();

productManager.addProduct({
    title: "Playstation 4",
    description: "1TB de memoria, 3 juegos y 2 joystick",
    price: 19.99,
    thumbnail: "path/to/playStation4.jpg",
    code: "ABC123",
    stock: 50
});

productManager.addProduct({
    title: "PlayStation 5",
    description: "1TB de memoria, 1 juego y 1 joystick",
    price: 29.99,
    thumbnail: "path/to/playStation5.jpg",
    code: "XYZ789",
    stock: 30
});

console.log("Todos los productos:", productManager.getProducts());

const productIdToFind = 2;
const foundProduct = productManager.getProductById(productIdToFind);
console.log(`Producto con ID ${productIdToFind}:`, foundProduct);