import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link, Outlet } from "react-router-dom";

const Layout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [openUsers, setOpenUsers] = useState(false);

  if (!auth) return null;

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-2xl font-extrabold tracking-wide">
            <span className="text-indigo-400">A</span>dmin
          </h1>
          <p className="text-xs text-gray-400">Control Panel</p>
        </div>

        <nav className="flex-1 space-y-2 text-sm">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-300">
            📊 Dashboard
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white"
          >
            📦 Productos
          </Link>

          <div>
            <div
              onClick={() => setOpenUsers(!openUsers)}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
            >
              <div className="flex items-center gap-3">👥 Usuarios</div>
              <span className={`transition-transform ${openUsers ? "rotate-180" : ""}`}>▾</span>
            </div>

            {openUsers && (
              <div className="ml-8 mt-2 space-y-1 text-gray-400">
                <Link to="/users" className="block hover:text-white">Lista de usuarios</Link>
              </div>
            )}
          </div>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded-lg text-sm"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENIDO DE LAS PÁGINAS */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
