class ProductManager{
    constructor(){
        this.products = []
    };

    getProducts(){
        return this.products;
    };


    addProduct(title, description, price, thumbnail, code, stock){

        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) {
              throw new Error("Todos los campos son obligatorios");
            }
        
            const codeExists = this.products.some((product) => product.code === code);
            if (codeExists) {
              throw new Error(`El código '${code}' ya está en uso`);
            }
        

        let newId;
        if(!this.products.length){
            newId=1;
        } else {
            newId = this.products[this.products.length-1].id+1
        };

        const newProduct = {
            id:newId,
             title,
              description,
              price,
             thumbnail,
             code,
             stock
        
        }
        this.products.push(newProduct)
        console.log("Nuevo producto creado", newProduct);

       
            
        
          } catch (error) {
            console.log(error.message);
          }

    };

    getProductById(idProduct){
        
        const productoExiste = this.products.some((products)=>{return products.id === idProduct});
        if(!productoExiste){
            console.log("Not found")
        } else {
            this.products.find((products)=>{return products.id === idProduct});
            console.log(`Producto con id ${idProduct} encontrado`);
           
        }
    };


};


const manager = new ProductManager();
console.log(manager);

const productos = manager.getProducts();
// console.log(productos);

manager.addProduct("Adidas Galaxy6", "Calzado running de media gama", 36000, "https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/z/a/zapatillas-running-adidas-galaxy-6-gris-100010gw4140001-1.jpg", "GW4141", 20 );


manager.addProduct("Nike Pegasus39", "Calzado Running de Alta Gama", 75000, "https://essential.vtexassets.com/arquivos/ids/592825-800-auto?v=637938513775400000&width=800&height=auto&aspect=true" , "DH3158001", 15);


manager.addProduct("Camiseta Argentina HeatReady", "Camiseta Oficial de la seleccion Argentina", 55000, "https://futbol10shop.com/pub/media/catalog/product/cache/419cd8a8af8d9007c8091882a8db063d/a/r/argentina_2022-2023_home_heatrdy-_0frente.jpg", "GM1355", 10);

manager.getProductById(3)
manager.getProductById(5)

manager.addProduct("Otro producto", "Otro producto", 55000, "https://Otroproducto.com/pub/media/catalog/product/cache/419cd8a8af8d9007c8091882a8db063d/a/r/argentina_2022-2023_home_heatrdy-_0frente.jpg", "GM1355", 10);