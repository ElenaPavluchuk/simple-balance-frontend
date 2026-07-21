import { useState } from "react";
import { authValidate } from "../../shared/utils/validate";
import axiosInstance from "../../shared/utils/axiosInstance";
import { API_PATHS } from "../../shared/utils/apiPaths";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../shared/context/auth/useAuth";
import AuthLayout from "../../shared/ui/Layouts/AuthLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateErrors, setValidateErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = authValidate({
      email,
      password,
    });

    setValidateErrors(errors);
    if (Object.keys(errors).length) return;

    const data = {
      email,
      password,
    };

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, data);

      if (response.status === 200) {
        login(response.data);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      const message =
        err?.response?.message || "Something went wrong. Please try again";
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center gap-5 h-screen">
        <h2 className="font-bold">Login user</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-2 w-fit">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setValidateErrors((prev) => ({ ...prev, email: "" }));
            }}
            placeholder="Email"
            className="border rounded p-2 w-md"
            type="email"
          />
          {validateErrors.email && (
            <p className="text-red-500 italic">{validateErrors.email}</p>
          )}

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValidateErrors((prev) => ({ ...prev, password: "" }));
            }}
            placeholder="Password"
            className="border rounded p-2 w-md"
            type="password"
          />
          {validateErrors.password && (
            <p className="text-red-500 italic">{validateErrors.password}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="border rounded p-2 bg-rose-400 text-white"
          >
            Login
          </button>
        </form>

        <span className="flex gap-1 mt-5">
          Don't have an account?
          <Link to="/signup" className="underline">
            Signup
          </Link>
        </span>

        {apiError && (
          <p className="text-red-500 italic text-center">{apiError}</p>
        )}
      </div>
    </AuthLayout>
  );
}
