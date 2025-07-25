import express from "express";
import viewsRouter from "./routes/views.router.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http";
import connectMongoDB from "./config/db.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import __dirname from "../dirname.js";
import Product from "./models/product.model.js";


const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectMongoDB();

// handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");

// puerto de nuestro servidor
const PORT = 8080;
// habilitamos poder recibir json
app.use(express.json());
// habilitamos la carpeta public
app.use(express.static( __dirname + "/public"));

// endpoints
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter)
app.use("/", viewsRouter);


// websocket

io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("newProduct", async(productData) => {
        try {
           const newProduct = new Product(productData);  
           await newProduct.save();

           console.log("Producto agregado a MongoDb:", newProduct); 
           
           io.emit("productAdded", newProduct);
        } catch (error) {
            console.error("Error al añadir el producto", error.message);            
        }
    });
});

// iniciamos el servidor y escuchamos en el puerto definido
server.listen(PORT, () => console.log(`Servidor iniciado en: http://localhost:${PORT}`) );











