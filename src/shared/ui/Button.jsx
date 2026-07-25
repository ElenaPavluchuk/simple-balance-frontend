import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  fontSize: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "link", "danger", "icon"]),
  className: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
};

export default function Button({
  children,
  onClick,
  type = "button",
  fontSize = "text-sm",
  variant = "primary",
  className = "",
  title,
  disabled = false,
}) {
  const variants = {
    primary:
      "bg-emerald-800 text-white hover:shadow-lg shadow-emerald-500/50 active:bg-emerald-900 text-base font-medium h-9",
    secondary: "border",
    link: "italic underline",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    icon: "hover:bg-gray-100 active:bg-gray-200 w-fit",
  };

  const baseClasses = `px-4 py-2
    flex items-center justify-center gap-2
    rounded-md transition-all duration-[120ms] ease-out select-none whitespace-nowrap
    disabled:opacity-50 disabled:pointer-events-none cursor-pointer 
    ${fontSize || "text-md"} ${variants[variant] || variants.primary}`;

  return (
    <button
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`
          ${baseClasses}
          ${className}
        `}
    >
      {children}
    </button>
  );
}
