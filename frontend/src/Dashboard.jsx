import { useNavigate } from "react-router-dom";
import Projects from "./Projects";
import Header from "./components/Header";

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={logout} />
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Bienvenido al Dashboard</h2>
            <div className="text-sm text-gray-600">Admin</div>
          </div>
          <Projects />
        </div>
      </main>
    </div>
  );
}
