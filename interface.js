// interface.js

// Definición de la interfaz Product (ahora en el ámbito global)
class Product {
    constructor(id_product, name, brand, category, section, description, image, price, price_end, stock, message_stock, state) {
        this.id_product = id_product;
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.section = section;
        this.description = description;
        this.image = image;
        this.price = price;
        this.price_end = price_end;
        this.stock = stock;
        this.message_stock = message_stock;
        this.state = state;
    }
}

// Función para obtener productos desde un archivo JSON
//https://social-bussines-back.vercel.app/api/products/active
async function fetchProducts() {
    const response = await fetch('https://social-bussines-back.vercel.app/api/products/active');
    if (!response.ok) {
        throw new Error('Error al cargar los productos');
    }
    const products = await response.json();
    return products.map(product => new Product(
        product.id_product,
        product.name,
        product.brand,
        product.category,
        product.section,
        product.description,
        product.image,
        product.price,
        product.price_end,
        product.stock,
        product.message_stock,
        product.state
    ));
}

// Hacer que la función fetchProducts y la clase Product estén disponibles globalmente
window.Product = Product; // Exponer la clase Product
window.fetchProducts = fetchProducts; // Exponer la función fetchProducts
