import { useState } from "react";
import { authValidate } from "../../utils/validate";
import { Link } from "react-router";
import Input from "../Input";
import Button from "../Button";
import PropTypes from "prop-types";

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isLoginLoading: PropTypes.bool.isRequired,
};

export default function LoginForm({ onLogin, isLoginLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateErrors, setValidateErrors] = useState({});

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
      email,
      password,
    });

    setValidateErrors(errors);
    if (Object.keys(errors).length) return;

    const data = {
      email,
      password,
    };

    onLogin(data);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-8 h-screen px-3"
    >
      <h2 className="text-emerald-800 text-3xl">Log in to your account</h2>

      <div className="flex flex-col gap-2 w-full max-w-sm">
        <Input
          value={email}
          onChange={handleEmailChange}
          label="Email Address"
          type="email"
        />
        {validateErrors.email && (
          <p className="text-red-500 italic">{validateErrors.email}</p>
        )}

        <Input
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          type="password"
        />
        {validateErrors.password && (
          <p className="text-red-500 italic">{validateErrors.password}</p>
        )}

        <Button
          type="submit"
          disabled={isLoginLoading}
          variant="primary"
          className="mt-8"
        >
          {isLoginLoading ? "Loading..." : "Login"}
        </Button>
      </div>

      <span className="flex gap-1 text-slate-800 font-semibold text-lg">
        Don't have an account?
        <Link to="/signup" className="text-sky-500">
          Signup
        </Link>
      </span>
    </form>
  );
}
