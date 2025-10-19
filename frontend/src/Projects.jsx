import { useEffect, useState } from "react";
import { get, post, put, del } from "./api/http";
import ProjectTable from "./components/ProjectTable";
import ProjectModal from "./components/ProjectModal";
import ConfirmModal from "./components/ConfirmModal";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = (await get("/api/projects", true)) || [];
      // Intentar cargar usuarios para resolver owner_id -> owner.nombre
      let users = [];
      try {
        users = (await get("/api/users", true)) || [];
      } catch (uErr) {
        console.warn(
          "no se pudieron cargar usuarios para resolver owners:",
          uErr
        );
      }

      const usersById = users.reduce((acc, u) => {
        acc[u.id] = u;
        return acc;
      }, {});

      const enriched = data.map((p) => ({
        ...p,
        owner: usersById[p.owner_id] || null,
      }));

      setProjects(enriched);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSaveProject = async (form) => {
    setError(null);
    try {
      if (editProject) await put(`/api/projects/${editProject.id}`, form, true);
      else await post("/api/projects", form, true);
      setModalOpen(false);
      setEditProject(null);
      fetchProjects();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEditProject = (p) => {
    setEditProject(p);
    setModalOpen(true);
  };

  const handleDeleteProject = async (id) => {
    try {
      await del(`/api/projects/${id}`, true);
      setConfirmOpen(false);
      setToDeleteId(null);
      fetchProjects();
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
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              Gestión de Proyectos
            </h2>
            <p className="text-sm text-slate-500">
              Crea, edita y organiza proyectos activos en Globant.
            </p>
          </div>
          <button
            onClick={() => {
              setEditProject(null);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl transition"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
            </svg>
            Nuevo Proyecto
          </button>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-400/30 bg-red-100/50 text-red-700 px-4 py-3">
            {error}
          </div>
        )}

        {/* Tabla o carga */}
        {loading ? (
          <div className="flex justify-center py-20">
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
          <>
            <ProjectTable
              projects={projects}
              onEdit={handleEditProject}
              onDeleteRequest={handleDeleteRequest}
            />
            <ConfirmModal
              open={confirmOpen}
              title="Eliminar proyecto"
              message="¿Estás seguro que quieres eliminar este proyecto? Esta acción no se puede deshacer."
              onConfirm={() => handleDeleteProject(toDeleteId)}
              onCancel={() => {
                setConfirmOpen(false);
                setToDeleteId(null);
              }}
            />
          </>
        )}

        <ProjectModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveProject}
          initial={editProject}
        />
      </div>
    </div>
  );
}
