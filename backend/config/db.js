import mongoose from "mongoose";

export const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conexión a la base de datos exitosa");
    } catch (error) {
        console.error(error);
        process.exit(1); // Salir del proceso con fallo
    }
};
