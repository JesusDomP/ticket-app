export default function Ticket({ ticket, onUpdate, onDelete }) {
  const estadoColores = {
    Abierto: "bg-green-100 text-green-700",
    "En Progreso": "bg-yellow-100 text-yellow-700",
    Cerrado: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {ticket.titulo}
        </h2>

        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            estadoColores[ticket.estado]
          }`}
        >
          {ticket.estado}
        </span>
      </div>

      {/* Descripción */}
      <p className="text-gray-600 mb-3">
        {ticket.descripcion}
      </p>

      {/* Responsable */}
      <p className="text-sm text-gray-500 mb-4">
        <span className="font-medium">Responsable:</span>{" "}
        {ticket.responsable}
      </p>

      {/* Acciones */}
      <div className="flex gap-2">
        <button
          onClick={() =>
            onUpdate(ticket._id, {
              estado:
                ticket.estado === "Abierto"
                  ? "En Progreso"
                  : ticket.estado === "En Progreso"
                  ? "Cerrado"
                  : "Abierto",
            })
          }
          className="text-sm px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Cambiar estado
        </button>

        <button
  onClick={() => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este ticket?"
    );

    if (confirmacion) {
      onDelete(ticket._id);
    }
  }}
  className="
    text-sm px-3 py-1 rounded-lg
    bg-red-500 text-white
    transition-all duration-150
    hover:bg-red-600
    active:scale-95
    focus:outline-none focus:ring-2 focus:ring-red-400
  "
>
  Eliminar
</button>
      </div>
    </div>
  );
}
