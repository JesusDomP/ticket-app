import Ticket from "../models/Ticket.js";

//Obtener todos los tickets
export const obtenerTicket = async (req, res) => {
    const tickets = await Ticket.find();
    res.json(tickets);
};

//Crear un nuevo ticket
export const crearTicket = async (req, res) => {
    const ticket = new Ticket(req.body);
    const guardado = await ticket.save();
    res.status(201).jsaon(guardado);
};

//Actualizar el ticket
export const actualizarTicket = async (req, res) => {
    const actualizar = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(actualizar);
};

//Eliminar el ticket
export const borrarTicket = async (req, res) => {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket eliminado."});
};