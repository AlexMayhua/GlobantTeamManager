import { useEffect, useState } from "react";
import { get, post, put, del } from "./api/http";
import AssignmentTable from "./components/AssignmentTable";
import AssignmentModal from "./components/AssignmentModal";
import ConfirmModal from "./components/ConfirmModal";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAssign, setEditAssign] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const data = await get("/api/assignments", true);
      setAssignments(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSave = async (form) => {
    setError(null);
    try {
      if (editAssign)
        await put(`/api/assignments/${editAssign.id}`, form, true);
      else await post("/api/assignments", form, true);
      setModalOpen(false);
      setEditAssign(null);
      fetchAssignments();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await del(`/api/assignments/${id}`, true);
      setConfirmOpen(false);
      setToDeleteId(null);
      fetchAssignments();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDeleteRequest = (id) => {
    setToDeleteId(id);
    setConfirmOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-50 text-slate-800">
      <div className="max-w-6xl mx-auto p-6">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              Gestión de Asignaciones
            </h2>
            <p className="text-sm text-slate-500">
              Administra las asignaciones de usuarios a proyectos.
            </p>
          </div>
          <button
            onClick={() => {
              setEditAssign(null);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-xl transition"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
            </svg>
            Nueva Asignación
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <svg
              className="h-8 w-8 animate-spin text-emerald-600"
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
          <>
            {error && (
              <div className="mb-4 rounded-lg border border-red-400/30 bg-red-100/50 text-red-700 px-4 py-3">
                {error}
              </div>
            )}
            <AssignmentTable
              assignments={assignments}
              onDeleteRequest={handleDeleteRequest}
            />
            <ConfirmModal
              open={confirmOpen}
              title="Eliminar asignación"
              message="¿Estás seguro que quieres eliminar esta asignación?"
              onConfirm={() => handleDelete(toDeleteId)}
              onCancel={() => {
                setConfirmOpen(false);
                setToDeleteId(null);
              }}
            />
          </>
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => (globalThis.location.href = "/dashboard")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Volver al Dashboard
          </button>
        </div>

        <AssignmentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initial={editAssign}
        />
      </div>
    </div>
  );
}
