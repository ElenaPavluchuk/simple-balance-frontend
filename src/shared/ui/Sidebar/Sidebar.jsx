import PropTypes from "prop-types";
import { Link, useLocation } from "react-router";
import { MENU_DATA } from "./config/data";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/auth/useAuth";
import Button from "../Button";
import LogoBig from "../Icons/LogoBig";
import LogoSmall from "../Icons/LogoSmall";

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
    <div
      className={`${
        isOpen ? "w-full sm:w-2xs" : "w-20"
      } border-r border-gray-200 shadow-md transition-all duration-300 ease-in-out flex flex-col h-screen sticky top-0`}
    >
      <div className="flex items-center justify-center border-b border-gray-200">
        {isOpen ? (
          <LogoBig className="w-30 lg:w-40 2xl:w-44 text-emerald-800 my-3" />
        ) : (
          <LogoSmall className="w-10 lg:w-12 text-emerald-800 my-3" />
        )}
      </div>

      <nav className="flex-1 pt-4 bg-white">
        <ul className="space-y-2 px-3">
          {filteredData.map((item) => (
            <li key={item.KEY}>
              <Link
                to={item.PATH}
                className={`
                    flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                    ${
                      location.pathname === item.PATH
                        ? "bg-teal-100 text-teal-800 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
              >
                <span className={`${isOpen ? "" : "mx-auto"}`}>
                  <item.ICON size={20} />
                </span>

                {isOpen && <span>{item.LABEL}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center justify-center">
        <Button onClick={logout} variant="link">
          Logout
        </Button>
      </div>

      <div className="flex items-center justify-center">
        <Button onClick={toggleSidebar} variant="icon">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>
    </div>
  );
}
