import fs from 'fs/promises';

class ProductManager {
    constructor() {
        this.path = 'products.json';
        this.products = [];
        this.productIdCounter = 1;
        this.loadProductsFromFile();
    }

    addProduct(product) {
        const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];

        for (const field of requiredFields) {
            if (!(field in product) || (typeof product[field] === 'string' && product[field].trim() === '')) {
                console.error(`El campo '${field}' es obligatorio.`);
                return;
            }
        }

        if (this.products.some(existingProduct => existingProduct.code === product.code)) {
            console.error("Ya existe un producto con el mismo código.");
            return;
        }

        product.id = this.productIdCounter++;
        this.products.push(product);

        this.saveProductsToFile();

        console.log("Producto agregado:", product);
    }

    getProducts(limit) {
        if (limit) {
            return this.products.slice(0, limit);
        } else {
            return this.products;
        }
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === +id);

        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado.");
        }
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === +id);

        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
            this.saveProductsToFile();
            console.log("Producto actualizado:", this.products[productIndex]);
        } else {
            console.error("Producto no encontrado.");
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === +id);

        if (productIndex !== -1) {
            const deletedProduct = this.products.splice(productIndex, 1)[0];
            this.saveProductsToFile();
            console.log("Producto eliminado:", deletedProduct);
        } else {
            console.error("Producto no encontrado.");
        }
    }

    async loadProductsFromFile() {
        try {
            const fileContent = await fs.readFile(this.path, 'utf8');
            this.products = JSON.parse(fileContent);
        } catch (error) {
            console.error("Error al cargar el archivo de productos:", error.message);
            console.warn("Se creará uno nuevo.");
            this.saveProductsToFile();
        }
    }

    saveProductsToFile() {
        fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8')
            .catch(error => console.error("Error al escribir en el archivo:", error));
    }
}

export default ProductManager;