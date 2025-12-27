export default function Ticket({ ticket, onUpdate, onDelete }) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">{ticket.titulo}</h2>
            <p>{ticket.descripcion}</p>
            <p className="text-sm">Responsable: {ticket.responsable}</p>

            <select 
            value={ticket.estado}
            onChange={(e) => onUpdate(ticket._id, { estado: e.target.value })}
            className="mt-2 border rounded p-1"
            >
                <option>Abierto</option>
                <option>En Progreso</option>
                <option>Cerrado</option>
            </select>

            <button 
            onClick={() => onDelete(ticket._id)}
            className="ml-4 text-red-600">
                Eliminar
            </button>
        </div>
    );
}