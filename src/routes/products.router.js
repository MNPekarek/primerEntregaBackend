
import ProductManager from "../ProductManager.js";


const productManager = new ProductManager("./src/data/products.json");

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