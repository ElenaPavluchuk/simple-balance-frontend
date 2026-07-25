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
      className="flex flex-col items-center justify-center gap-5 h-screen"
    >
      <h2 className="font-bold">Login user</h2>

      <div className="flex flex-col gap-2 w-fit">
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

        <Button type="submit" disabled={isLoginLoading} variant="primary">
          {isLoginLoading ? "Loading..." : "Login"}
        </Button>
      </div>

      <span className="flex gap-1 mt-5">
        Don't have an account?
        <Link to="/signup" className="underline">
          Signup
        </Link>
      </span>
    </form>
  );
}
