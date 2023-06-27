const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.idCounter = 0;
    this.loadDatabase();
  }

  fileExist() {
    return fs.existsSync(this.path);
  }

  async loadDatabase() {
    try {
      if (this.fileExist()) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        this.products = JSON.parse(data);
      } else {
        console.log("El archivo no existe. Se creará una nueva base de datos.");
        this.saveDatabase();
      }
    } catch (error) {
      console.log("No se pudo cargar la base de datos. Se creará una nueva.");
      this.saveDatabase();
    }
  }

  async saveDatabase() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2),
        "utf-8"
      );
      console.log("Base de datos guardada correctamente.");
    } catch (error) {
      console.log("Error al guardar la base de datos.", error.message);
    }
  }

  generateId() {
    this.idCounter++;
    return this.idCounter.toString(36);
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    const newProducts = Array.isArray(product) ? product : [product];
    const addedProducts = newProducts.map((p) => ({
      ...p,
      id: this.generateId(),
    }));
    this.products.push(...addedProducts);
    this.saveDatabase();
    return addedProducts;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const product = this.getProductById(id);
    Object.assign(product, updatedFields);
    this.saveDatabase();
    return product;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    const deletedProduct = this.products.splice(index, 1)[0];
    this.saveDatabase();
    return deletedProduct;
  }
}
module.exports = { ProductManager };


// const manager = new ProductManager();
// console.log(manager);

// const productos = manager.getProducts();
// console.log(productos);

// manager.addProduct(title:"Adidas Galaxy6", description: "Calzado running de media gama",price:  36000,thumbnail:  "https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/z/a/zapatillas-running-adidas-galaxy-6-gris-100010gw4140001-1.jpg",code: "GW4141",stock: 20 );


// manager.addProduct("Nike Pegasus39", "Calzado Running de Alta Gama", 75000, "https://essential.vtexassets.com/arquivos/ids/592825-800-auto?v=637938513775400000&width=800&height=auto&aspect=true" , "DH3158001", 15);


// manager.addProduct("Camiseta Argentina HeatReady", "Camiseta Oficial de la seleccion Argentina", 55000, "https://futbol10shop.com/pub/media/catalog/product/cache/419cd8a8af8d9007c8091882a8db063d/a/r/argentina_2022-2023_home_heatrdy-_0frente.jpg", "GM1355", 10);

// manager.addProduct("Otro producto", "Otro producto", 55000, "https://Otroproducto.com/pub/media/catalog/product/cache/419cd8a8af8d9007c8091882a8db063d/a/r/argentina_2022-2023_home_heatrdy-_0frente.jpg", "GM1355", 10);

// manager.addProduct("Camiseta", "Camiseta ", 55000, "https://futbol10shop.com/pub/media/catalog/product/cache/419cd8a8af3d/a/r/argentina_2022-2023_home_heatrdy-_0frente.jpg", "G1355", 10);

// manager. getProductById(3)
// manager.getProductById(5)

// manager.addProduct("Camiseta", "Camiseta ", 55000, "https://futbol10shop.com/pub/media/catalog/product/cache/419cd8a8af3d/a/r/argentina_2022-2023_home_heatrdy-_0frente.jpg", "G1355", 10);