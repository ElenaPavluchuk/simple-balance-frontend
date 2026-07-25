import { useState } from "react";
import Select from "react-select";
import { Link } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useOptions } from "../../hooks/useOptions";
import { authValidate } from "../../utils/validate";
import Input from "../Input";
import Button from "../Button";
import PropTypes from "prop-types";

SignupForm.propTypes = {
  onSignup: PropTypes.func.isRequired,
  isSignupLoading: PropTypes.bool.isRequired,
};

export default function SignupForm({ onSignup, isSignupLoading }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateErrors, setValidateErrors] = useState({});

  const {
    selectedOption,
    setSelectedOption,
    allOptions,
    isOptionsLoading,
    optionsApiError,
  } = useOptions({
    queryKey: [],
    queryFn: async () => {
      const response = await axiosInstance.get(
        API_PATHS.CURRENCIES.GET_CURRENCIES,
      );

      return response.data;
    },
    initialData: "USD",
  });

  const handleChangeCurrency = (option) => {
    setSelectedOption(option || null);
    setValidateErrors((prev) => ({ ...prev, selectedCurrency: "" }));
  };

  const handleUserNameChange = (e) => {
    setUserName(e);
    setValidateErrors((prev) => ({ ...prev, userName: "" }));
  };

  const handleEmailChange = (e) => {
    setEmail(e);
    setValidateErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e);
    setValidateErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = authValidate({
      selectedCurrency: selectedOption,
      userName,
      email,
      password,
    });

    setValidateErrors(errors);
    if (Object.keys(errors).length) return;

    const data = {
      currencyId: selectedOption.value,
      userName: userName.trim(),
      email,
      password,
    };

    onSignup(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-5 h-screen"
    >
      <h2 className="font-bold">Create an account</h2>

      <div className="flex flex-col gap-2 w-86">
        <div>
          <label className="text-gary-500 text-sm">Select currency</label>
          <Select
            value={selectedOption}
            onChange={handleChangeCurrency}
            options={allOptions}
            isLoading={isOptionsLoading}
          />
          {validateErrors.selectedCurrency && (
            <p className="text-red-500 italic">
              {validateErrors.selectedCurrency}
            </p>
          )}
          {optionsApiError && (
            <p className="text-red-500 italic">{optionsApiError}</p>
          )}
        </div>

        <Input
          value={userName}
          onChange={handleUserNameChange}
          placeholder="Name"
        />
        {validateErrors.userName && (
          <p className="text-red-500 italic">{validateErrors.userName}</p>
        )}

        <Input
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          type="email"
        />
        {validateErrors.email && (
          <p className="text-red-500 italic">{validateErrors.email}</p>
        )}

        <Input
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          type="password"
        />
        {validateErrors.password && (
          <p className="text-red-500 italic">{validateErrors.password}</p>
        )}

        <Button type="submit" disabled={isSignupLoading} variant="primary">
          {isSignupLoading ? "Loading..." : "Sign Up"}
        </Button>
      </div>

      <span className="flex gap-1 mt-5">
        Already have an account?
        <Link to="/login" className="underline">
          Login
        </Link>
      </span>
    </form>
  );
}
