import express from "express";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";

const app = express();
app.use(express.json());

const cartManager = new CartManager();
const productManager = new ProductManager("./src/products.json");

// /api/products

// GET - Obtener datos
app.get("/api/products", async(req, res)=> {
    try {
        const products = await productManager.getProducts();
        
        res.status(200).json({ status: "success", products });
    } catch (error) {
        res.status(500).json({ status: "error" });        
    }
});

// GET
// Obtener datos por id
app.get("/api/products/:pid", async(req, res)=>{
    const pid = parseInt(req.params.pid);

    const product = await productManager.getProductsById(pid);
    res.status(200).json({ product, message: "Producto por Id "});
});


// POST
app.post("/api/products", async(req, res) => {
    try {
        const newProduct = req.body;        
        const products = await productManager.addProducts(newProduct);
        res.status(201).json({ status : "success", products })
    } catch (error) {
        res.status(500).json({ status: "error" });         
    }
});

// PUT
app.put("/api/products/:pid", async(req, res)=>{
    try {
        const productId = req.params.pid;
        const updatedData = req.body;

        const products = await productManager.updateProductByID(productId, updatedData);
        res.status(200).json({ status: "success", products});
    } catch (error) {
        res.status(500).json({ status: "error" });  
    }
})

app.listen(8080, ()=> {
    console.log("Servidor iniciado en el puerto 8080")
});

// DELETE
app.delete("/api/products/:pid", async(req, res)=> {
    try {
        const productId = req.params.pid;
        const products = await productManager.deleteProductById(productId);
        res.status(200).json({ status: "success", products });        
    } catch (error) {
        res.status(500).json({ status: "error" });         
    }    
});



// /api/carts

// POST
// Crear carrito
app.post("/api/carts", async(req, res)=>{
    const carts = await cartManager.addCart();
    res.status(201).json({ carts, message: "Nuevo carrito creado" });
});

// GET
// Listar productos del carrito
app.get("/api/carts/:cid", async(req, res)=>{
    const cid = req.params.cid;
    const products = await cartManager.getProductsInCartById(cid);
    res.status(200).json({ products, message: "Lista de productos" });
});

// POST
// Agregar productos al carrito
app.post("/api/carts/:cid/product/:pid", async(req , res)=>{
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const quantity = req.body.quantity;

    const carts = await cartManager.addProductInCart(cid, pid, quantity);
    res.status(200).json({ carts, message: "Nuevo producto añadido"});
});