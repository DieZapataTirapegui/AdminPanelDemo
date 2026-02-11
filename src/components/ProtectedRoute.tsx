import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// 🔹 Tipamos las props
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useContext(AuthContext);

  if (!auth) return null; // seguridad por si el contexto no está

  return auth.isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
