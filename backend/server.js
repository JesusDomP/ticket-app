import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { conectarDB } from "./config/db.js";
import ticketRoutes from "./routes/tickets.routes.js";

// Cargar variables de entorno y conectar a la base de datos
dotenv.config();
conectarDB();

// Crear la aplicación de Express
const app = express();

// Middlewares 
app.use(cors({
  origin: "http://localhost:5173", // Conexión con el frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// Rutas
app.use("/api/tickets", ticketRoutes);

// Iniciar el servidor
app.listen(4000, () => {
    console.log("Servidor corriendo en http://localhost:4000")
});