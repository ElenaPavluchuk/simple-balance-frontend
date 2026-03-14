import { Navigate } from "react-router";
import { useUser } from "../../context/user/useUser";

// export const AuthGuard = ({ children }) => {
//   const isAuth = localStorage.getItem("token");

//   if (!isAuth) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// protected route
export function AuthGuard({ children }) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
