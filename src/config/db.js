import mongoose from "mongoose";

const connectMongoDB = async() => {
    try {
       await mongoose.connect("mongodb+srv://coder:coderpass@ecommerce-cluster.3w20xtd.mongodb.net/myEcommerce?retryWrites=true&w=majority&appName=ecommerce-cluster");
       console.log("Conectado con MongoDB!")
    } catch (error) {
        console.log("Error al conectar MongoDB")
    }
}

export default connectMongoDB;
