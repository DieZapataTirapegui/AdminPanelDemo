import { useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const success = auth.login(username, password);
    if (success) navigate("/dashboard");
    else setError("Usuario o contraseña incorrectos");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl w-80 text-white">
        <h2 className="text-2xl font-bold text-center mb-6 tracking-wide">
          Dashboard Demo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full bg-white/10 border border-white/20 p-2 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="w-full bg-white/10 border border-white/20 p-2 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-2 rounded-lg font-semibold">
            Ingresar
          </button>
        </form>

        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );

}
export default Login;
