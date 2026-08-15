import PropTypes from "prop-types";
import { Link, useLocation } from "react-router";
import { MENU_DATA } from "./config/data";
import { useAuth } from "../../context/auth/useAuth";
import Button from "../Button";
import LogoBig from "../Icons/LogoBig";
import LogoSmall from "../Icons/LogoSmall";
import ArrowIcon from "../Icons/ArrowIcon";

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const filteredData = MENU_DATA.filter((item) => {
    if (item.KEY === "manage-users" || item.KEY === "manage-content") {
      return user?.user_role === "ADMIN";
    }

    return true;
  });

  return (
    <aside
      className={`${
        isOpen ? "w-full sm:w-2xs" : "w-20"
      } border-r border-gray-200 shadow-md transition-all duration-300 ease-in-out flex flex-col h-screen sticky top-0 overflow-x-hidden`}
    >
      <div className="flex items-center justify-center border-b border-gray-200">
        {isOpen ? (
          <LogoBig className="w-30 lg:w-40 2xl:w-44 text-emerald-800 my-3" />
        ) : (
          <LogoSmall className="w-10 text-emerald-800 my-3" />
        )}
      </div>

      <nav className="flex-1 pt-4 bg-white">
        <ul className="space-y-2 px-3">
          {filteredData.map((item) => (
            <li key={item.KEY}>
              <Link
                to={item.PATH}
                className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      location.pathname === item.PATH
                        ? "bg-emerald-700 text-white font-medium"
                        : "text-emerald-900 hover:bg-gray-100"
                    }
                  `}
              >
                <span
                  className={`flex shrink-0 justify-center ${isOpen ? "w-6" : "w-full"}`}
                >
                  <item.ICON />
                </span>

                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-100 ${isOpen ? "opacity-100 max-w-45" : "opacity-0 max-w-0"}`}
                >
                  {item.LABEL}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center mt-10">
          <Button onClick={toggleSidebar} variant="icon">
            <ArrowIcon
              className={`text-emerald-800 ${isOpen ? "rotate-180 transition-all duration-300 ease-in-out" : "rotate-0"}`}
            />
          </Button>
        </div>
      </nav>

      <div className="flex items-center justify-center mb-3">
        <Button onClick={logout} variant="link">
          Logout
        </Button>
      </div>
    </aside>
  );
}
