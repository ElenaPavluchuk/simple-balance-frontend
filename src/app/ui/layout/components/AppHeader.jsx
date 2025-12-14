import PropTypes from "prop-types";
import { Menu, X } from "lucide-react";
import Button from "../../../../shared/ui/Button/Button";

AppHeader.propTypes = {
  isSidebarClose: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default function AppHeader({ isSidebarClose, toggleSidebar }) {
  return (
    <header className="h-16 bg-teal-100 shadow-sm flex items-center">
      <Button
        onClick={toggleSidebar}
        className="w-16 h-16 flex items-center justify-center hover:bg-teal-200 transition-colors text-gray-700"
      >
        {isSidebarClose ? (
          <Menu className="w-6 h-6" />
        ) : (
          <X className="w-6 h-6" />
        )}
      </Button>
    </header>
  );
}
