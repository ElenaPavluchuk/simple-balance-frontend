import { Link, useLocation } from "react-router";
import { data } from "./config/data";
import { Menu, X } from "lucide-react";

export default function Sidebar({ isSidebarClose, toggleSidebar }) {
  const location = useLocation();

  return (
    <div
      className={`${
        isSidebarClose ? "w-20" : "w-64"
      } bg-teal-100 transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className="h-16 flex items-center justify-center border-b">
        <p>simple BALANCE</p>
      </div>

      <nav className="flex-1 pt-4 bg-white">
        <ul className="space-y-2 px-3">
          {data.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.key}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                    ${
                      location.pathname === item.path
                        ? "bg-teal-100 text-teal-800 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <span className={`${isSidebarClose ? "mx-auto" : ""}`}>
                    <Icon size={20} />
                  </span>

                  {!isSidebarClose && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center justify-center">
        <button
          onClick={toggleSidebar}
          className="w-16 h-16 flex items-center justify-center hover:bg-teal-200 transition-colors text-gray-700"
        >
          {isSidebarClose ? (
            <Menu className="w-6 h-6" />
          ) : (
            <X className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
