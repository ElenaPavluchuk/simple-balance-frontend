import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PropTypes from "prop-types";

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "password", "date"]),
  step: PropTypes.string,
  max: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

export default function Input({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  step,
  multiline = false,
  rows = 4,
  max,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="text-xs font-semibold text-cyan-950">{label}</label>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-2 py-1 border border-gray-400 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      ) : (
        <div className="w-full flex justify-between items-center text-sm text-cyan-950 relative">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            placeholder={placeholder}
            className="w-full h-9 px-2 py-1 border border-gray-400 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500"
            step={step}
            max={max}
          />

          {type === "password" && (
            <>
              {showPassword ? (
                <Eye
                  size={18}
                  className="text-gray-400 cursor-pointer absolute right-1/16"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeOff
                  size={18}
                  className="text-gray-400 cursor-pointer absolute right-1/16"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
