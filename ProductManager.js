const fs = require('fs').promises;

class ProductManager {
    constructor (filePath) {
        this.products = [];
        this.filePath = filePath;
    }

    async init() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            this.products = JSON.parse(data);
        } catch (err) {
            await this.saveProducts();
        }
    }

    async saveProducts() {
        await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2));
    }

    generateId() {
        if (this.id) {
            this.id++
        } else {
            //Si no existe le asigna 1
            this.id = 1
        }
        return this.id
    }

    async getAllProducts() {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    async getProducts() {
        return this.products;
    }

    async addProduct(product) {
        const id = this.generateId();
        const newProduct = { ...product, id };
        this.products.push(newProduct);
        await this.saveProducts();
        return newProduct;
    }

    async getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    async updateProduct(id, updateData) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        this.products[productIndex] = { ...this.products[productIndex], ...updateData };
        await this.saveProducts();
        return this.products[productIndex];
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        this.products.splice(productIndex, 1);
        await this.saveProducts();
    }
}

(async () => {
    const manager = new ProductManager();
    await manager.init();

    console.log('Productos al inicio:', await manager.getProducts());

    const newProduct = {
        title: 'Iphone 14 Pro',
        description: '128gb Deep Purple',
        price: 2000,
        thumbnail: [],
        code: 'P0001',
        stock: 25,
    };

    const addedProduct = await manager.addProduct(newProduct);
    console.log('Producto agregado:', addedProduct);

    console.log('Productos después de agregar:', await manager.getProducts());

    const productId = addedProduct.id;
    const getProductById = await manager.getProductById(productId);
    console.log('Producto por ID:', getProductById);

    const updateData = { price: 250, stock: 30 };
    const updatedProduct = await manager.updateProduct(productId, updateData);
    console.log('Producto actualizado:', updatedProduct);

    await manager.deleteProduct(productId);
    console.log('Producto eliminado');
})();
module.exports = ProductManager;