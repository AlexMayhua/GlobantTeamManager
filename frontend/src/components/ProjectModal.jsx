import { useState, useEffect } from "react";
import { get } from "../api/http";

const estados = ["planificado", "en_progreso", "pausado", "cerrado"];

export default function ProjectModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    estado: "planificado",
    fecha_inicio: "",
    fecha_fin: "",
    owner_id: "",
  });

  useEffect(() => {
    if (initial) setForm((f) => ({ ...f, ...initial }));
    else
      setForm({
        nombre: "",
        descripcion: "",
        estado: "planificado",
        fecha_inicio: "",
        fecha_fin: "",
        owner_id: "",
      });
  }, [initial, open]);

  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    if (!open) return;
    let mounted = true;
    (async () => {
      try {
        const u = await get("/api/users", true);
        if (mounted) setUsersList(u || []);
      } catch (err) {
        console.error("no se pudieron cargar usuarios:", err);
      }
    })();
    return () => (mounted = false);
  }, [open]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre) return;
    const payload = {
      ...form,
      owner_id: form.owner_id ? Number(form.owner_id) : null,
    };
    onSave(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 transition"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">
          {initial ? "Editar Proyecto" : "Nuevo Proyecto"}
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm text-slate-600 mb-1">Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Estado</label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {estados.map((e) => (
                <option key={e} value={e}>
                  {e.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-600 mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Fecha inicio
            </label>
            <input
              name="fecha_inicio"
              type="date"
              value={form.fecha_inicio || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Fecha fin
            </label>
            <input
              name="fecha_fin"
              type="date"
              value={form.fecha_fin || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-600 mb-1">Owner</label>
            <select
              name="owner_id"
              value={form.owner_id || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Sin owner</option>
              {usersList.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre || u.correo}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              {initial ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
