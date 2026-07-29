import PropTypes from "prop-types";

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default function Card({ children, className = "" }) {
  const baseClasses =
    "md:p-6 p-4 bg-white rounded-3xl border border-solid border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 ease-in-out";

  return (
    <div
      className={`
          ${baseClasses}
          ${className}
        `}
    >
      {children}
    </div>
  );
}
