import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.number,
  fontSize: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "link", "danger", "icon"]),
  className: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
};

export default function Button({
  children,
  onClick,
  size = null,
  fontSize = "text-sm",
  variant = "primary",
  className = "",
  title,
  disabled = false,
}) {
  const variants = {
    primary: "bg-pink-400 text-white hover:bg-pink-500 active:bg-pink-700",
    secondary: "border",
    link: "italic underline",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    icon: "hover:bg-gray-100 active:bg-gray-200",
  };

  const baseClasses = `
    flex items-center justify-center gap-2
    rounded-md transition-all select-none whitespace-nowrap
    disabled:opacity-50 disabled:pointer-events-none
    font-medium cursor-pointer ${fontSize}
    ${variants[variant] || variants.primary}
  `;

  const sizeClasses = size
    ? `w-${size / 4} h-${size / 4} min-w-${size / 4}`
    : "px-4 py-2";

  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${sizeClasses}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
