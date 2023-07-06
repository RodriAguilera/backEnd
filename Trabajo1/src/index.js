import fs from "fs";
import { ProductManager } from "./ProductManager.js";
const productFilePath = './products.json'; 
const manager = new ProductManager(productFilePath);

console.log("manager", manager)

const operaciones = async()=>{
  try {
    const exists = await manager.fileExist();
    console.log("exists", exists);

    //lectura de archivo
    const resultado = await manager.getProducts();
    console.log("resultado", resultado);

    //agregar productos
    await manager.addProduct(
      "Adidas Galaxy6",
      "Calzado running de media gama",
      36000,
      "https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/z/a/zapatillas-running-adidas-galaxy-6-gris-100010gw4140001-1.jpg",
      "GW4141",
      20
    );

    await manager.addProduct(
      "Nike Air Max",
      "Zapatillas deportivas para correr",
      55000,
      "https://media.nike.com/ae/en_us/dw/600c1153-d860-446c-b8c9-7d50975a43ad.jpg",
      "NM1234",
      10
    );

    await manager.addProduct(
      "Nike Pegasus39", "Calzado Running de Alta Gama", 75000, "https://essential.vtexassets.com/arquivos/ids/592825-800-auto?v=637938513775400000&width=800&height=auto&aspect=true" , "DH3158001", 15);

  } catch (error) {
    console.log(error.message);
  }

  try {
    // Obtener producto por ID
    const productId = 1; 
    const product = await manager.getProductById(productId);
    console.log("Producto por ID:", product);
  } catch (error) {
    console.log(error.message);
  }

  try {
    // Actualizar producto por ID
    const productIdToUpdate = 1;
    const updatedFields = {
      price: 40000,
      stock: 30,
    };
    const updatedProduct = await manager.updateProduct(productIdToUpdate, updatedFields);
    console.log("Producto actualizado:", updatedProduct);
  } catch (error) {
    console.log(error.message);
  }

  try {
    // Eliminar producto por ID
    const productIdToDelete = 2; 
    const isDeleted = await manager.deleteProduct(productIdToDelete);
    if (isDeleted) {
      console.log("Producto eliminado exitosamente.");
    } else {
      console.log("No se pudo eliminar el producto.");
    }
  } catch (error) {
    console.log(error.message);
  }

};

operaciones();

