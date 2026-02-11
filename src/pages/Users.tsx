import { useState } from "react";
import { users as initialUsers } from "../data/users";
import { Link } from "react-router-dom";


const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );


  // Campos edición
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setIsEditOpen(true);
  };

  const openDeleteModal = (user: any) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleDelete = () => {
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setIsDeleteOpen(false);
  };

  const handleEditSave = () => {
    setUsers(
      users.map((u) =>
        u.id === selectedUser.id
          ? { ...u, name: editName, email: editEmail, role: editRole }
          : u
      )
    );
    setIsEditOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Lista de Usuarios</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre, rol o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-md"
          />
        </div>

      <div className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-white/10 text-sm uppercase text-gray-300">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">Email</th>
              <th className="p-4">Rol</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-white/10 hover:bg-white/5"
              >
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4 flex gap-4">
                  <Link
                    to={`/users/${user.id}`}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    Ver detalle
                  </Link>

                  <button
                    onClick={() => openEditModal(user)}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => openDeleteModal(user)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL EDITAR ================= */}
      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-96 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>

            <input
              className="w-full mb-3 p-2 rounded bg-white/10 border border-white/20"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Nombre"
            />

            <input
              className="w-full mb-3 p-2 rounded bg-white/10 border border-white/20"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              className="w-full mb-6 p-2 rounded bg-white/10 border border-white/20"
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
              placeholder="Rol"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditSave}
                className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL ELIMINAR ================= */}
      {isDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-96 shadow-2xl text-center">
            <h2 className="text-xl font-bold mb-4 text-red-400">
              ¿Eliminar usuario?
            </h2>
            <p className="mb-6 text-gray-300">
              Esta acción es solo visual (demo).
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="text-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
