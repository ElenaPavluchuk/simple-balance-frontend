import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar/Sidebar";

export default function Layout() {
  const [isSidebarClose, setIsSidebarClose] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar
        isSidebarClose={isSidebarClose}
        toggleSidebar={() => setIsSidebarClose(!isSidebarClose)}
      />
      <main
        className={`bg-pink-100 w-full ${
          isSidebarClose ? "ml-20" : "ml-64"
        } transition-all duration-300`}
      >
        <Outlet />
      </main>
    </div>
  );
}
