import { Navigate } from "react-router";
import { useAuth } from "../../context/auth/useAuth";

// export const AuthGuard = ({ children }) => {
//   const isAuth = localStorage.getItem("token");

//   if (!isAuth) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// protected route
export function AuthGuard({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
