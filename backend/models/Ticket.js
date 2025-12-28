import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    // Definición de los campos del esquema y sus validaciones
    {
        titulo: { 
            type: String,
            required: [true, "El título es obligatorio"],
            trim: true,
        },

        descripcion: {
            type: String, 
            required: [true, "La descripción es obligatoria"],
        },

        estado: {
            type: String,
            enum: ["Abierto", "En Progreso", "Cerrado"],
            default: "Abierto",
        },

        responsable: {
            type: String, 
            required: [true, "El responsable es obligatorio"],
        },
    },
    {timestamps: true}    
);

export default mongoose.model("Ticket", ticketSchema);