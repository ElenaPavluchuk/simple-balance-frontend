import { useUser } from "../../../../shared/context/user/useUser";
import { Navigate } from "react-router";

export const AuthGuard = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
