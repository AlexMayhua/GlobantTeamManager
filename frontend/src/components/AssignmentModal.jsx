import { useState, useEffect } from "react";
import { get } from "../api/http";

const roles = ["dev", "pm", "qa", "ux", "data", "devops"];

export default function AssignmentModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({
    id_usuario: "",
    id_proyecto: "",
    rol: "dev",
    horas_semana: 40,
    fecha_asignacion: "",
  });
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (initial) setForm((f) => ({ ...f, ...initial }));
    else
      setForm({
        id_usuario: "",
        id_proyecto: "",
        rol: "dev",
        horas_semana: 40,
        fecha_asignacion: "",
      });
  }, [initial, open]);

  useEffect(() => {
    if (!open) return;
    let mounted = true;
    (async () => {
      try {
        const u = await get("/api/users", true);
        const p = await get("/api/projects", true);
        if (mounted) {
          setUsers(u || []);
          setProjects(p || []);
        }
      } catch (e) {
        console.error("no se pudieron cargar users/projects:", e);
      }
    })();
    return () => (mounted = false);
  }, [open]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id_usuario || !form.id_proyecto || !form.fecha_asignacion) return;
    const payload = {
      ...form,
      id_usuario: Number(form.id_usuario),
      id_proyecto: Number(form.id_proyecto),
    };
    onSave(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 transition"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">
          {initial ? "Editar Asignación" : "Nueva Asignación"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Usuario
              </label>
              <select
                name="id_usuario"
                value={form.id_usuario}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="">Seleccione usuario</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nombre || u.correo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Proyecto
              </label>
              <select
                name="id_proyecto"
                value={form.id_proyecto}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="">Seleccione proyecto</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Rol</label>
            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Horas/Semana
            </label>
            <input
              name="horas_semana"
              type="number"
              min="0"
              max="60"
              value={form.horas_semana}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Fecha de Asignación
            </label>
            <input
              name="fecha_asignacion"
              type="date"
              value={form.fecha_asignacion || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition"
            >
              {initial ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
