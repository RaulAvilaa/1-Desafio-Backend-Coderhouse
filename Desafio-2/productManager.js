const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.productIdCounter = 1;

        // Cargar productos desde el archivo al inicializar la instancia
        this.loadProductsFromFile();
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

        // Guardar productos en el archivo
        this.saveProductsToFile();

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

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            // Actualizar el producto con los nuevos campos
            this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };

            // Guardar productos actualizados en el archivo
            this.saveProductsToFile();

            console.log("Producto actualizado:", this.products[productIndex]);
        } else {
            console.error("Producto no encontrado.");
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            // Eliminar el producto del array
            const deletedProduct = this.products.splice(productIndex, 1)[0];

            // Guardar productos actualizados en el archivo
            this.saveProductsToFile();

            console.log("Producto eliminado:", deletedProduct);
        } else {
            console.error("Producto no encontrado.");
        }
    }

    loadProductsFromFile() {
        try {
            // Leer productos desde el archivo y parsear el contenido como JSON
            const fileContent = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(fileContent);
        } catch (error) {
            // Si hay un error al leer el archivo, se asume que no existe o está vacío
            console.warn("No se pudo cargar el archivo de productos. Se creará uno nuevo.");
        }
    }

    saveProductsToFile() {
        // Escribir productos en el archivo en formato JSON
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
    }
}

// Ruta del archivo donde se almacenarán los productos
const filePath = 'products.json';

const productManager = new ProductManager(filePath);

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

const productIdToUpdate = 2;
productManager.updateProduct(productIdToUpdate, { stock: 25 });

const productIdToDelete = 1;
productManager.deleteProduct(productIdToDelete);