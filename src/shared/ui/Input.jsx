import { useState } from "react";
import Button from "./Button";
import EyeIcon from "./Icons/EyeIcon";
import EyeOffIcon from "./Icons/EyeOffIcon";
import PropTypes from "prop-types";

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "password", "date"]),
  step: PropTypes.string,
  max: PropTypes.string,
  isMultiline: PropTypes.bool,
  rows: PropTypes.number,
};

export default function Input({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  step,
  isMultiline = false,
  rows = 4,
  max,
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div>
      <label className="text-xs font-medium text-cyan-900">{label}</label>

      {isMultiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-150 ease-in-out"
        />
      ) : (
        <div className="w-full flex justify-between items-center text-sm text-cyan-950 relative">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={
              type === "password"
                ? isShowPassword
                  ? "text"
                  : "password"
                : type
            }
            placeholder={placeholder}
            className="w-full h-9 px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-150 ease-in-out"
            step={step}
            max={max}
          />

          {type === "password" && (
            <>
              {isShowPassword ? (
                <Button
                  onClick={() => setIsShowPassword(false)}
                  variant="icon"
                  className="text-gray-400 hover:text-gray-500 absolute right-0"
                >
                  <EyeIcon className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  onClick={() => setIsShowPassword(true)}
                  variant="icon"
                  className="text-gray-400 hover:text-gray-500 absolute right-0"
                >
                  <EyeOffIcon className="w-5 h-5" />
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
