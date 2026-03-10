import { Navigate } from "react-router";

export const AuthGuard = ({ children }) => {
  const isAuth = localStorage.getItem("token");

  if (!isAuth) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};
