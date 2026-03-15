import { useState } from "react";
import { Link } from "react-router";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [errors, setErrors] = useState(null);

  const validate = () => {
    const validateErrors = {};

    if (!fullName.trim()) {
      validateErrors.fullName = "Full name is required";
    }

    setErrors(validateErrors);
    return Object.keys(validateErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validate()) return;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen">
      <h2>Create an account</h2>

      <form onSubmit={handleSignup} className="flex flex-col gap-2 w-fit">
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full name"
          className="border rounded p-2 w-md"
        />
        {errors?.fullName && <p>{errors.fullName}</p>}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email adress"
          className="border rounded p-2 w-md"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Pasword"
          className="border rounded p-2 w-md"
          type="password"
        />

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
