export default function ProjectTable({ projects, onEdit, onDeleteRequest }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow">
      <table className="min-w-full text-sm text-slate-700">
        <thead>
          <tr className="bg-slate-100/80 text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Descripción</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Inicio</th>
            <th className="px-4 py-3">Fin</th>
            <th className="px-4 py-3">Owner</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {projects.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                className="text-center py-8 text-slate-400 italic"
              >
                No hay proyectos registrados
              </td>
            </tr>
          ) : (
            projects.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-blue-50/40 transition-colors duration-100"
              >
                <td className="px-4 py-3 font-medium">{p.id}</td>
                <td className="px-4 py-3 font-semibold text-slate-800">
                  {p.nombre}
                </td>
                <td className="px-4 py-3">{p.descripcion || "-"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
                      p.estado === "planificado"
                        ? "bg-indigo-500"
                        : p.estado === "en_progreso"
                        ? "bg-green-500"
                        : p.estado === "pausado"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {p.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {p.fecha_inicio || "-"}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {p.fecha_fin || "-"}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {p.owner && (p.owner.nombre || p.owner.correo)
                    ? p.owner.nombre || p.owner.correo
                    : p.owner_id || "-"}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-blue-600 hover:text-blue-800 font-medium mr-3 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDeleteRequest(p.id)}
                    className="text-red-600 hover:text-red-800 font-medium transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
