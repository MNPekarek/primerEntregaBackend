
import CartManager from "../CartManager";


const cartManager = new CartManager();

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