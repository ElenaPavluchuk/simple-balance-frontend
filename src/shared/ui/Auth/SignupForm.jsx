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
      className="flex flex-col items-center justify-center gap-8 h-screen px-3"
    >
      <h2 className="text-emerald-800 text-3xl">Create your account</h2>

      <div className="flex flex-col gap-2 w-full max-w-sm">
        <div>
          <label className="text-xs font-medium text-cyan-950">
            Select currency
          </label>
          <Select
            value={selectedOption}
            onChange={handleChangeCurrency}
            options={allOptions}
            isLoading={isOptionsLoading}
            unstyled
            classNames={{
              control: ({ isFocused }) =>
                `w-full h-9 px-2 border rounded-md transition duration-150
              ${isFocused ? "border-sky-500 ring-2 ring-sky-500" : "border-gray-400"}`,
              valueContainer: () => "p-0",
              input: () => "m-0 p-0 text-sm text-cyan-950",
              placeholder: () => "text-sm text-gray-400",
              singleValue: () => "text-sm text-cyan-950",
              indicatorsContainer: () => "h-full",
              dropdownIndicator: () => "text-gray-500 hover:text-gray-700",
              clearIndicator: () => "text-gray-500",
              menu: () =>
                "mt-1 rounded-md border border-gray-300 bg-white shadow-lg",
              option: ({ isFocused, isSelected }) =>
                `px-3 py-2 cursor-pointer ${
                  isSelected
                    ? "bg-sky-500 text-white"
                    : isFocused
                      ? "bg-sky-100"
                      : "bg-white"
                }`,
            }}
          />
          {validateErrors.selectedCurrency && (
            <p className="text-red-600 text-xs">
              {validateErrors.selectedCurrency}
            </p>
          )}
          {optionsApiError && (
            <p className="text-red-600 text-xs">{optionsApiError}</p>
          )}
        </div>

        <Input value={userName} onChange={handleUserNameChange} label="Name" />
        {validateErrors.userName && (
          <p className="text-red-600 text-xs">{validateErrors.userName}</p>
        )}

        <Input
          value={email}
          onChange={handleEmailChange}
          label="Email Address"
          type="email"
        />
        {validateErrors.email && (
          <p className="text-red-600 text-xs">{validateErrors.email}</p>
        )}

        <Input
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          type="password"
        />
        {validateErrors.password && (
          <p className="text-red-600 text-xs">{validateErrors.password}</p>
        )}

        <Button
          type="submit"
          disabled={isSignupLoading}
          variant="primary"
          className="mt-8"
        >
          {isSignupLoading ? "Loading..." : "Sign Up"}
        </Button>
      </div>

      <span className="flex gap-1 text-slate-800 font-medium text-lg">
        Have an account?
        <Link to="/login" className="text-sky-500">
          Log in now
        </Link>
      </span>
    </form>
  );
}
