import { useState } from "react";
import axiosInstance from "../../shared/utils/axiosInstance";
import { API_PATHS } from "../../shared/utils/apiPaths";
import { useNavigate } from "react-router";
import { useAuth } from "../../shared/context/auth/useAuth";
import toast from "react-hot-toast";
import LoginForm from "../../shared/ui/Auth/LoginForm";
import AuthLayout from "../../shared/ui/Layouts/AuthLayout";

export default function LoginPage() {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setIsLoginLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, data);

      if (response.status === 200) {
        login(response.data);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(err);
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LoginForm onLogin={handleLogin} isLoginLoading={isLoginLoading} />
    </AuthLayout>
  );
}
