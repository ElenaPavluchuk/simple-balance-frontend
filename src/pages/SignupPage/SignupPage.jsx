import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Select from "react-select";
import axiosInstance from "../../shared/utils/axiosInstance";
import { API_PATHS } from "../../shared/utils/apiPaths";
import { useAuth } from "../../shared/context/auth/useAuth";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrencyOptions = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.CURRENCIES.GET_CURRENCIES,
        );

        const normolizedOptions = response?.data?.map((o) => ({
          label: o.code,
          value: o.id,
        }));

        setCurrencyOptions(normolizedOptions || []);

        const defaultCurrency = normolizedOptions?.find(
          (c) => c.label === "USD",
        );

        if (defaultCurrency) {
          setSelectedCurrency(defaultCurrency);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getCurrencyOptions();
  }, []);

  const validate = () => {
    const validateErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!selectedCurrency) {
      validateErrors.selectedCurrency = "Currency is required";
    }

    if (!fullName.trim()) {
      validateErrors.fullName = "Full name is required";
    } else if (fullName.length > 100) {
      validateErrors.fullName =
        "Full name must be no more than 100 characters long";
    }

    if (!emailRegex.test(email)) {
      validateErrors.email = "Please enter a valide email address";
    }

    if (!password) {
      validateErrors.password = "Password is required";
    } else if (password.length < 6 || password.length > 128) {
      validateErrors.password =
        "Password length must be between 6 and 128 characters";
    }

    setErrors(validateErrors);
    return Object.keys(validateErrors).length === 0;
  };

  const handleChangeCurrency = (option) => {
    setSelectedCurrency(option || null);
    setErrors((prev) => ({ ...prev, selectedCurrency: "" }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = {
      currencyId: selectedCurrency.value,
      fullName: fullName.trim(),
      email: email.trim(),
      password,
    };

    setIsLoading(true);

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
      const message =
        err?.response?.message || "Something went wrong. Please try again";
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen">
      <h2 className="font-bold">Create an account</h2>

      <form onSubmit={handleSignup} className="flex flex-col gap-2 w-fit">
        <div>
          <label className="text-gary-500 text-sm">Select currency</label>
          <Select
            value={selectedCurrency}
            onChange={handleChangeCurrency}
            options={currencyOptions}
          />
          {errors.selectedCurrency && (
            <p className="text-red-500 italic">{errors.selectedCurrency}</p>
          )}
        </div>

        <input
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            setErrors((prev) => ({ ...prev, fullName: "" }));
          }}
          placeholder="Full name"
          className="border rounded p-2 w-md"
        />
        {errors.fullName && (
          <p className="text-red-500 italic">{errors.fullName}</p>
        )}

        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
          placeholder="Email"
          className="border rounded p-2 w-md"
          type="email"
        />
        {errors.email && <p className="text-red-500 italic">{errors.email}</p>}

        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
          placeholder="Password"
          className="border rounded p-2 w-md"
          type="password"
        />
        {errors.password && (
          <p className="text-red-500 italic">{errors.password}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="border rounded p-2 bg-rose-400 text-white"
        >
          Sign up
        </button>
      </form>

      <span className="flex gap-1 mt-5">
        Already have an account?
        <Link to="/login" className="underline">
          Login
        </Link>
      </span>

      {apiError && (
        <p className="text-red-500 italic text-center">{apiError}</p>
      )}
    </div>
  );
}
