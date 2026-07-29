import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "link", "danger", "icon"]),
  iconColor: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  title,
  disabled = false,
}) {
  const variants = {
    primary:
      "bg-emerald-800 hover:shadow-lg shadow-emerald-600/50 active:bg-emerald-900 text-white",
    secondary:
      "bg-gray-50 border border-gray-400 hover:shadow-lg shadow-gray-400/50 hover:bg-white active:border-gray-500 text-cyan-950",
    link: "italic underline",
    danger:
      "bg-red-600 text-white hover:shadow-lg shadow-red-400/50 active:bg-red-800",
    icon: "bg-transparent",
  };

  const baseClasses = `px-6 py-2 h-9
    flex items-center justify-center gap-2 font-medium text-sm
    rounded-md transition-all duration-[120ms] ease-out select-none whitespace-nowrap
    disabled:opacity-50 disabled:pointer-events-none cursor-pointer 
     ${variants[variant] || variants.primary}`;

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
