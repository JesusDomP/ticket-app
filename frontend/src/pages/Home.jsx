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

  const fetchTickets = async () => {
    const res = await api.get("/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/tickets", form);
    setForm({ titulo: "", descripcion: "", responsable: "" });
    fetchTickets();
  };

  const updateTicket = async (id, data) => {
    await api.put(`/tickets/${id}`, data);
    fetchTickets();
  };

  const deleteTicket = async (id) => {
    await api.delete(`/tickets/${id}`);
    fetchTickets();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          placeholder="Título"
          className="border p-2 w-full"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          required
        />
        <textarea
          placeholder="Descripción"
          className="border p-2 w-full"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          required
        />
        <input
          placeholder="Responsable"
          className="border p-2 w-full"
          value={form.responsable}
          onChange={(e) => setForm({ ...form, responsable: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Crear Ticket
        </button>
      </form>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Ticket
            key={ticket._id}
            ticket={ticket}
            onUpdate={updateTicket}
            onDelete={deleteTicket}
          />
        ))}
      </div>
    </div>
  );
}
