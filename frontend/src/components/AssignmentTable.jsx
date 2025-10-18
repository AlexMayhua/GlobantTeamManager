export default function AssignmentTable({ assignments, onDeleteRequest }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow">
      <table className="min-w-full text-sm text-slate-700">
        <thead>
          <tr className="bg-slate-100/80 text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Usuario</th>
            <th className="px-4 py-3">Proyecto</th>
            <th className="px-4 py-3">Rol</th>
            <th className="px-4 py-3">Horas/Sem</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {assignments.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="text-center py-8 text-slate-400 italic"
              >
                No hay asignaciones registradas
              </td>
            </tr>
          ) : (
            assignments.map((a) => (
              <tr
                key={a.id}
                className="hover:bg-emerald-50/40 transition-colors duration-100"
              >
                <td className="px-4 py-3 font-medium">{a.id}</td>
                <td className="px-4 py-3">
                  {a.usuario
                    ? a.usuario.nombre || a.usuario.correo
                    : a.id_usuario}
                </td>
                <td className="px-4 py-3">
                  {a.proyecto ? a.proyecto.nombre : a.id_proyecto}
                </td>
                <td className="px-4 py-3 capitalize">{a.rol}</td>
                <td className="px-4 py-3">{a.horas_semana}</td>
                <td className="px-4 py-3 text-slate-500">
                  {a.fecha_asignacion}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onDeleteRequest(a.id)}
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
