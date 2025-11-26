import { Link, useLocation } from "react-router";

export default function SidebarItem({ item, isSidebarClose }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const Icon = item.icon;

  return (
    <li>
      <Link
        to={item.path}
        className={`
          flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
          ${
            isActive
              ? "bg-teal-100 text-teal-800 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }
        `}
      >
        <span className={`${isSidebarClose ? "mx-auto" : ""}`}>
          <Icon className="w-5 h-5" />
        </span>

        {!isSidebarClose && <span>{item.label}</span>}
      </Link>
    </li>
  );
}
