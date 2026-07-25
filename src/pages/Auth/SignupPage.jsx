import { useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../../shared/utils/axiosInstance";
import { API_PATHS } from "../../shared/utils/apiPaths";
import { useAuth } from "../../shared/context/auth/useAuth";
import SignupForm from "../../shared/ui/Auth/SignupForm";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../shared/utils/getErrorMessage";

export default function SignupPage() {
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    setIsSignupLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTRATION,
        data,
      );

      if (response.status === 201) {
        login(response.data);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsSignupLoading(false);
    }
  };

  return (
    <SignupForm onSignup={handleSignup} isSignupLoading={isSignupLoading} />
  );
}
