import { useParams, useNavigate } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate("/users")}
        className="mb-6 inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-sm text-white px-4 py-2 rounded-lg transition"

      >
        ← Volver al listado
      </button>

      <h1 className="text-3xl font-bold mb-6">Detalle de Usuario</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-md space-y-3">
        <p><span className="font-semibold text-gray-400">ID:</span> {id}</p>
        <p><span className="font-semibold text-gray-400">Nombre:</span> Usuario {id}</p>
        <p><span className="font-semibold text-gray-400">Email:</span> usuario{id}@correo.com</p>
        <p><span className="font-semibold text-gray-400">Rol:</span> Admin</p>
      </div>
    </div>
  );
};

export default UserDetail;
