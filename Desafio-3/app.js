import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const port = 3000;

const productManagerInstance = new ProductManager();

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManagerInstance.getProducts(limit);
        res.json(products);
    } catch (error) {
        console.error("Error en /products:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManagerInstance.getProductById(productId);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json(product);
        }
    } catch (error) {
        console.error("Error en /products/:pid:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});