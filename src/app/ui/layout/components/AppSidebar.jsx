import PropTypes from "prop-types";
import SidebarItem from "./SidebarItem";
import { sidebarMenu } from "../config/sidebarMenu";

AppSidebar.propTypes = {
  isSidebarClose: PropTypes.bool.isRequired,
};

export default function AppSidebar({ isSidebarClose }) {
  return (
    <div
      className={`${
        isSidebarClose ? "w-20" : "w-64"
      } bg-teal-100 shadow-lg transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* heare will be logo */}
      <div className="h-16 flex items-center justify-center border-b">
        <div className="bg-gray-300 border-2 border-dashed rounded-xl w-10 h-10" />
      </div>

      <nav className="flex-1 pt-4 bg-white">
        <ul className="space-y-2 px-3">
          {sidebarMenu.map((item) => (
            <SidebarItem
              key={item.key}
              item={item}
              isSidebarClose={isSidebarClose}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
