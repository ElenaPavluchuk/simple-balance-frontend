import { useState } from "react";
import AppSidebar from "./components/AppSidebar";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";

export default function AppLayout() {
  const [isSidebarClose, setIsSidebarClose] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <AppSidebar isSidebarClose={isSidebarClose} />
      <div className="flex-1 flex flex-col">
        <AppHeader
          isSidebarClose={isSidebarClose}
          toggleSidebar={() => setIsSidebarClose(!isSidebarClose)}
        />
        <AppContent />
      </div>
    </div>
  );
}
