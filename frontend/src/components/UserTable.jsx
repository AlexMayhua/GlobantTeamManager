const roles = ["admin", "pm", "dev", "qa", "viewer"];

export default function UserTable({ users, onEdit, onRoleChange }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow">
      <table className="min-w-full text-sm text-slate-700">
        <thead>
          <tr className="bg-slate-100/80 text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Correo</th>
            <th className="px-4 py-3">Rol</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Creado</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {users.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="text-center py-8 text-slate-400 italic"
              >
                No hay usuarios registrados
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-blue-50/40 transition-colors duration-100"
              >
                <td className="px-4 py-3 font-medium text-slate-600">{u.id}</td>
                <td className="px-4 py-3">{u.nombre}</td>
                <td className="px-4 py-3">{u.correo}</td>
                <td className="px-4 py-3">
                  <select
                    value={u.rol}
                    onChange={(e) =>
                      onRoleChange && onRoleChange(u.id, e.target.value)
                    }
                    className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      u.estado === "activo"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onEdit(u)}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                    </svg>
                    Editar
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
