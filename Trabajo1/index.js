const { ProductManager } = require("./ProductManager");
const productFilePath = "./products.json";
const productManager = new ProductManager(productFilePath);

console.log(productManager.getProducts());

const productsToAdd = [
  {
    title: "Adidas Galaxy6",
    description: "Calzado running de media gama",
    price: 36000,
    thumbnail:
      "https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/z/a/zapatillas-running-adidas-galaxy-6-gris-100010gw4140001-1.jpg",
    code: "GW4141",
    stock: 20,
  },
  {
    title: "Nike Air Max",
    description: "Zapatillas deportivas para correr",
    price: 55000,
    thumbnail:
      "https://media.nike.com/ae/en_us/dw/600c1153-d860-446c-b8c9-7d50975a43ad.jpg",
    code: "NM1234",
    stock: 10,
  },
  {
    title: "Nike Pegasus39",
    description: "Calzado Running de Alta Gama",
    price: 75000,
    thumbnail: "https://essential.vtexassets.com/arquivos/ids/592825-800-auto?v=637938513775400000&width=800&height=auto&aspect=true",
    code: "DH3158001",
    stock: 15
  },
];

// Productos agregados en addedProducts
const addedProducts = productManager.addProduct(productsToAdd);
console.log(addedProducts);

// Productos existentes
console.log(productManager.getProducts());

// Obtener un producto específico por su ID
const retrievedProduct = productManager.getProductById("1");
console.log(retrievedProduct);

// Campos para actualizar en el producto
const updatedFields = { price: 55000, stock: 20 };

// Actualizar el producto con los campos actualizados
const updatedProduct = productManager.updateProduct("1", updatedFields);
console.log(updatedProduct);

// Eliminar un producto
const deletedProduct = productManager.deleteProduct("2");
console.log(deletedProduct);
