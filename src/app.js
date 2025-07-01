import express from "express";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";
import viewsRouter from "./routes/views.router.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http";


const app = express();
const server = http.createServer(app);
const io = new Server(server);

// handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// puerto de nuestro servidor
const PORT = 8080;
// habilitamos poder recibir json
app.use(express.json());
// habilitamos la carpeta public
app.use(express.static("public"));

// endpoints


app.use("/", viewsRouter);


// websocket
const productManager = new ProductManager("./src/data/products.json")
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("newProduct", async(productData) => {
        try {
           const newProduct = await productManager.addProducts(productData);  

           console.log("producto agregado:", newProduct); //sas
           
           io.emit("productAdded", newProduct);
        } catch (error) {
            console.error("Error al añadir el producto");            
        }
    })
});

// iniciamos el servidor y escuchamos en el puerto definido
server.listen(PORT, () => console.log(`Servidor iniciado en: http://localhost:${PORT}`) );











