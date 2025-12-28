import { useEffect, useState } from "react";
import api from "../services/api";
import Ticket from "../components/Ticket";

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    responsable: "",
  });

  
  const [errores, setErrores] = useState({});

  /* Obtener tickets */
  const fetchTickets = async () => {
    const res = await api.get("/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  /* Validación de campos */
  const validacionCampos = () => {
    const nuevosErrores = {};

    if (!form.titulo.trim()) {
      nuevosErrores.titulo = "El título es obligatorio.";
    }

    if (!form.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria.";
    }

    if (!form.responsable.trim()) {
      nuevosErrores.responsable = "El responsable es obligatorio.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validacionCampos()) {
      return;
    }

    try {
      await api.post("/tickets", form);
      setForm({ titulo: "", descripcion: "", responsable: "" });
      setErrores({});
      fetchTickets();
    } catch (error) {
      console.error("Error al crear ticket:", error);
    }
  };

  // Actualizar y borrar tickets
  const actualizarTicket = async (id, data) => {
    await api.put(`/tickets/${id}`, data);
    fetchTickets();
    };

  const borrarTicket = async (id) => {
    await api.delete(`/tickets/${id}`);
    fetchTickets();
  } ;

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Gestión de Tickets
        </h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">

          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errores.titulo ? "border-red-500" : ""
                }`}
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                required
              />
              {errores.titulo && (
                <p className="text-red-500 text-sm mt-1">{errores.titulo}</p>
              )}
          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>

            <textarea
              className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errores.descripcion ? "border-red-500" : ""
              }`}
              rows={3}
              value={form.descripcion}
              onChange={(e) =>
                setForm({ ...form, descripcion: e.target.value })
              }
              required
            />
            {errores.descripcion && (
              <p className="text-red-500 text-sm mt-1">{errores.descripcion}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsable
            </label>
            <input
              type="text"
              className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errores.responsable ? "border-red-500" : ""
              }`}
              value={form.responsable}
              onChange={(e) =>
                setForm({ ...form, responsable: e.target.value })
              }
              required
            />
            {errores.responsable && (
              <p className="text-red-500 text-sm mt-1">{errores.responsable}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Crear Ticket
          </button>
        </form>

        {/* Lista de tickets */}
        <div className="space-y-4">
          {tickets.length === 0 ? (
            <p className="text-gray-500 text-center">
              No hay tickets creados
            </p>
          ) : (
            tickets.map((ticket) => (
              <Ticket
                key={ticket._id}
                ticket={ticket}
                onUpdate={actualizarTicket}
                onDelete={borrarTicket}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
