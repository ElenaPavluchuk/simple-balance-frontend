import { Navigate } from "react-router";
import { useAuth } from "../../context/auth/useAuth";

export function AdminGuard({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.user_role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
