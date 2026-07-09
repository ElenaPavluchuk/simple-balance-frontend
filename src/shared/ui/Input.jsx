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
      <label className="text-sm text-slate-800">{label}</label>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      ) : (
        <div className="input-box">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            step={step}
            max={max}
          />

          {type === "password" && (
            <>
              {showPassword ? (
                <Eye
                  size={22}
                  className="text-primary cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeOff
                  size={22}
                  className="text-slate-400 cursor-pointer"
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
