import { Router } from "express";

import { obtenerTicket, crearTicket, actualizarTicket, borrarTicket, } from "../controllers/tickets.controller.js";

const router = Router();

router.get("/", obtenerTicket);
router.post("/", crearTicket);
router.put("/:id", actualizarTicket);
router.delete("/:id", borrarTicket);

export default router;