import express from "express";
import { ProductManager } from "./ProductManager.js";
const productFilePath = './products.json'; 
const manager = new ProductManager(productFilePath)


console.log(manager.getProducts());

const port = 8080;

const app = express();

app.listen(port,()=>console.log(`El servidor esta escuchando en el puerto ${port}`));


const productService = new ProductManager("./products.json");

app.get("/products",async(req,res)=>{
    try {
        const result = await productService.getProducts();
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

app.get("/products/:pid", async (req, res) => {
    try {
      const pid = parseInt(req.params.pid);
      const product = await manager.getProductById(pid);
      if (!product) {
        res.send("El producto no existe");
      } else {
        res.send(product);
      }
    } catch (error) {
      res.send(error.message);
    }
  });
  