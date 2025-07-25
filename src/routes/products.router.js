import express from "express"
import Product from "../models/product.model.js";

const productRouter = express.Router();

// /api/products

// GET - Obtener datos
productRouter.get("/", async(req, res)=> {
    try {
        const { limit = 10, page = 1 } = req.query;
        const data = await Product.paginate({}, { limit , page });  
        const products = data.docs;  
        delete data.docs;

        res.status(200).json({ status: "success", payload: products, ...data });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al recuperar los productos" })    
    }
});

// GET
// Obtener datos por id
productRouter.get("/:pid", async(req, res)=>{
    try {
        const pid = req.params.pid;    
        const product = await Product.findById(pid);

        res.status(200).json({ status: "success", payload: product });
        
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al recuperar el producto" })        
    }
});

// Obtener datos por categoria
productRouter.get("/category/:category", async(req, res)=>{
    try {
        const { limit = 10, page = 1 } = req.query;
        const category = req.params.category;         
        const query = category ? { category } : {};
        
        const data = await Product.paginate(query, { limit, page });
        const products = data.docs;
        delete data.docs;

        if(!products) return res.status(404).json({ status: "error", message: "Categoria no encontrada"})

        res.status(200).json({ status: "success", payload: products });
        
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al recuperar los productos por categoria" })        
    }
});


// POST
productRouter.post("/", async(req, res) => {
    try {
        const { title, description, code, price, stock, category } = req.body;

        const product = new Product({ title, description, code, price, stock, category });
        await product.save();

        res.status(201).json({ status : "success", payload: product })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al añadir un nuevo producto" });         
    }
});

// PUT
productRouter.put("/:pid", async(req, res)=>{
    try {
        const pid = req.params.pid;
        const updatedData = req.body;

        const updateProduct = await Product.findByIdAndUpdate(pid, updatedData, {new: true, runValidators: true });
        if(!updateProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado"});

        res.status(200).json({ status: "success", payload: updateProduct});
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al editar el producto" });  
    }
})

// DELETE
productRouter.delete("/:pid", async(req, res)=> {
    try {
        const pid = req.params.pid;

        const deleteProduct = await Product.findByIdAndDelete(pid);
        if(!deleteProduct) return res.status(404).json({ status: "error", message: " Producto no encontrado"})
        res.status(200).json({ status: "success", payload: deleteProduct });        
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al borrar un producto" });         
    }    
});

export default productRouter;












// import ProductManager from "../ProductManager.js";


// const productManager = new ProductManager("./src/data/products.json");

// /api/products

// GET - Obtener datos
// app.get("/api/products", async(req, res)=> {
//     try {
//         const products = await productManager.getProducts();
        
//         res.status(200).json({ status: "success", products });
//     } catch (error) {
//         res.status(500).json({ status: "error" });        
//     }
// });

// GET
// Obtener datos por id
// app.get("/api/products/:pid", async(req, res)=>{
//     const pid = parseInt(req.params.pid);

//     const product = await productManager.getProductsById(pid);
//     res.status(200).json({ product, message: "Producto por Id "});
// });


// POST
// app.post("/api/products", async(req, res) => {
//     try {
//         const newProduct = req.body;        
//         const products = await productManager.addProducts(newProduct);
//         res.status(201).json({ status : "success", products })
//     } catch (error) {
//         res.status(500).json({ status: "error" });         
//     }
// });

// PUT
// app.put("/api/products/:pid", async(req, res)=>{
//     try {
//         const productId = req.params.pid;
//         const updatedData = req.body;

//         const products = await productManager.updateProductByID(productId, updatedData);
//         res.status(200).json({ status: "success", products});
//     } catch (error) {
//         res.status(500).json({ status: "error" });  
//     }
// })

// app.listen(8080, ()=> {
//     console.log("Servidor iniciado en el puerto 8080")
// });

// DELETE
// app.delete("/api/products/:pid", async(req, res)=> {
//     try {
//         const productId = req.params.pid;
//         const products = await productManager.deleteProductById(productId);
//         res.status(200).json({ status: "success", products });        
//     } catch (error) {
//         res.status(500).json({ status: "error" });         
//     }    
// });