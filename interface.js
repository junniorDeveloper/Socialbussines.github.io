// interface.js

// Definición de la interfaz Product (solo como referencia, no se puede usar directamente en JavaScript)
export class Product {
    constructor(id_product, name, category, description, image, price, price_end, stock, message_stock, state) {
        this.id_product = id_product;
        this.name = name;
        this.category = category;
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
export async function fetchProducts() {
    const response = await fetch('data.json');
    if (!response.ok) {
        throw new Error('Error al cargar los productos');
    }
    const products = await response.json();
    return products.map(product => new Product(
        product.id_product,
        product.name,
        product.category,
        product.description,
        product.image,
        product.price,
        product.price_end,
        product.stock,
        product.message_stock,
        product.state
    ));
}
