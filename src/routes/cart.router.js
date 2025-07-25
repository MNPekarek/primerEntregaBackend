import express from "express"
import Cart from "../models/cart.model.js";

const cartRouter = express.Router();
// /api/carts

// POST
// Crear carrito
cartRouter.post("/", async(req, res)=>{
    try {
        const cart = new Cart();
        await cart.save();
        res.status(201).json({ status: "success", payload: cart });        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET
// Listar productos del carrito

cartRouter.get("/:cid", async(req, res)=>{
    try {
        const cid = req.params.cid;
        const cart = await Cart.findById(cid).populate("products.product");
        if(!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado"})
        
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
});

// POST
// Agregar productos al carrito

cartRouter.post("/:cid/product/:pid", async(req , res)=>{
    try {
        const { cid, pid } = req.params;        
        const { quantity } = req.body;

        const updateCart = await Cart.findByIdAndUpdate( cid, { $push: { products: { product: pid, quantity } } }, { new: true } );
        if(!updateCart) return res.status(404).json({ status: "error", message: "Carrito no encontrado"})
        
        res.status(201).json({ status: "success", payload: updateCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
});

// Delete products en cart
cartRouter.delete("/:cid/product/:pid", async(req , res)=>{
    try {
        const { cid, pid } = req.params;     
       
        const cart = await Cart.findById(cid);
        if(!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado"})
        
        cart.products = cart.products.filter(item => item.product.toString() !== pid);
        
        await cart.save()

        res.status(200).json({ status: "success", message: "Producto eliminado del carrito",  payload: cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
});

// Delete cart
cartRouter.delete("/:cid", async(req , res)=>{
    try {
        const cid = req.params.cid;     
       
        const cart = await Cart.findByIdAndDelete(cid);
        if(!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado"})

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
});

export default cartRouter;