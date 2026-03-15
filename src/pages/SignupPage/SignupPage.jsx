import { useState, useEffect } from "react";
import { Link } from "react-router";
import Select from "react-select";
import axiosInstance from "../../shared/utils/axiosInstance";
import { API_PATHS } from "../../shared/utils/apiPaths";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const getCurrencyOptions = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.CURRENCIES.GET_CURRENCIES,
        );

        const normolizeOptions = response?.data?.map((o) => ({
          label: o.code,
          value: o.id,
        }));

        setCurrencyOptions(normolizeOptions || []);

        const defaultCurrency = normolizeOptions?.find(
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!selectedCurrency) {
      validateErrors.selectedCurrency = "Currency is required";
    }

    if (!fullName.trim()) {
      validateErrors.fullName = "Full name is required";
    } else if (fullName.length > 100) {
      validateErrors.fullName =
        "Full name must be no more than 100 characters long";
    }

    if (!regex.test(email)) {
      validateErrors.email = "Please enter a valide email address";
    }

    if (!password.trim()) {
      validateErrors.password = "Password is required";
    } else if (password.length < 6 || password.length > 128) {
      validateErrors.password =
        "Password length must be between 6 and 128 characters";
    }

    setErrors(validateErrors);
    return Object.keys(validateErrors).length === 0;
  };

  const handleChangeCurrency = (options) => {
    setSelectedCurrency(options || []);
    setErrors((prev) => ({ ...prev, selectedCurrency: "" }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validate()) return;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen">
      <h2>Create an account</h2>

      <form onSubmit={handleSignup} className="flex flex-col gap-2 w-fit">
        <Select
          value={selectedCurrency}
          onChange={handleChangeCurrency}
          options={currencyOptions}
          placeholder="Select currency"
        />
        {errors?.selectedCurrency && (
          <p className="text-red-500 italic">{errors.selectedCurrency}</p>
        )}

        <input
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            setErrors((prev) => ({ ...prev, fullName: "" }));
          }}
          placeholder="Full name"
          className="border rounded p-2 w-md"
        />
        {errors?.fullName && (
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
        />
        {errors?.email && <p className="text-red-500 italic">{errors.email}</p>}

        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
          placeholder="Pasword"
          className="border rounded p-2 w-md"
          type="password"
        />
        {errors?.password && (
          <p className="text-red-500 italic">{errors.password}</p>
        )}

        <button
          type="submit"
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
    </div>
  );
}
