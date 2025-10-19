import { useEffect, useState } from "react";
import { get, post, put } from "./api/http";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await get("/api/users", true);
      setUsers(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (values) => {
    setError(null);
    try {
      if (editUser) {
        await put(`/api/users/${editUser.id}`, values, true);
      } else {
        await post("/api/users", values, false);
      }
      setModalOpen(false);
      setEditUser(null);
      fetchUsers();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await put(`/api/users/${id}`, { rol: newRole }, true);
      fetchUsers();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-50 text-slate-800">
      <div className="max-w-6xl mx-auto p-6">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              Gestión de Usuarios
            </h2>
            <p className="text-sm text-slate-500">
              Administra los colaboradores registrados y sus roles.
            </p>
          </div>
          <button
            onClick={() => {
              setEditUser(null);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl transition"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
            </svg>
            <span>Nuevo Usuario</span>
          </button>
        </div>

        {/* Mensajes de error */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-400/30 bg-red-100/50 text-red-700 px-4 py-3">
            {error}
          </div>
        )}

        {/* Cargando */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <svg
              className="h-8 w-8 animate-spin text-blue-600"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                opacity=".25"
              />
              <path
                d="M4 12a8 8 0 018-8"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-md overflow-hidden">
            <UserTable
              users={users}
              onEdit={(u) => {
                setEditUser(u);
                setModalOpen(true);
              }}
              onRoleChange={handleRoleChange}
            />
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Volver al Dashboard
          </button>
        </div>

        <UserModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initial={editUser}
        />
      </div>
    </div>
  );
}
