import fs from "fs";

export class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  fileExist() {
    return fs.existsSync(this.path);
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      // Validar campos obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error("Todos los campos son obligatorios");
      }
  
      let newId;
      if (this.fileExist()) {
        const contenido = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(contenido);
        if (!products.length) {
          newId = 1;
        } else {
          newId = products[products.length - 1].id + 1;
        }
      } else {
        newId = 1;
      }
  
      const newProduct = {
        id: newId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(newProduct);
      console.log("Nuevo producto creado", newProduct);
  
      // Realizamos la escritura al archivo
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
      console.log("Producto creado");
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  }
  
  async getProductById(id) {
    try {
      if (this.fileExist()) {
        const contenido = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(contenido);
        const product = products.find((p) => p.id === id);
        if (product) {
          return product;
        } else {
          throw new Error(`Producto con ID ${id} no encontrado`);
        }
      } else {
        throw new Error("El archivo no existe");
      }
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  }

  async getProducts() {
    try {
      if (this.fileExist()) {
        const contenido = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(contenido);
        return products;
      } else {
        console.log("El archivo no existe");
        return [];
      }
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al obtener los productos");
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      if (this.fileExist()) {
        const contenido = await fs.promises.readFile(this.path, "utf-8");
        let products = JSON.parse(contenido);
        const productIndex = products.findIndex((p) => p.id === id);
        if (productIndex !== -1) {
          products[productIndex] = { ...products[productIndex], ...updatedFields };
          await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
          console.log("Producto actualizado");
          return products[productIndex];
        } else {
          throw new Error(`Producto con ID ${id} no encontrado`);
        }
      } else {
        throw new Error("El archivo no existe");
      }
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  }

  async deleteProduct(id) {
    try {
      if (this.fileExist()) {
        const contenido = await fs.promises.readFile(this.path, "utf-8");
        let products = JSON.parse(contenido);
        const productIndex = products.findIndex((p) => p.id === id);
        if (productIndex !== -1) {
          products.splice(productIndex, 1);
          await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
          console.log("Producto eliminado");
          return true;
        } else {
          throw new Error(`Producto con ID ${id} no encontrado`);
        }
      } else {
        throw new Error("El archivo no existe");
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
