import { Link } from "react-router-dom";

export default function Header({ onLogout }) {
  return (
    <header className="backdrop-blur-xl bg-white/70 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-blue-500/10 grid place-items-center">
            <img src="/vite.svg" alt="logo" className="h-6 w-6" />
          </div>
          <span className="text-lg font-semibold text-gray-800 tracking-tight">
            Globant Team Manager
          </span>
        </div>

        <nav className="flex items-center gap-5">
          <Link
            to="/users"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            Usuarios
          </Link>
          <Link
            to="/assignments"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            Asignaciones
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </svg>
            <span>Cerrar sesión</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
