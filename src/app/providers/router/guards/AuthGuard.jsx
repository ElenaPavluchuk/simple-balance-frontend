import { useUser } from "../../../../shared/context/user/useUser";
import { Navigate } from "react-router";

export const AuthGuard = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div>
        <p>User loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
