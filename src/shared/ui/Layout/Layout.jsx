import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar/Sidebar";

export default function Layout() {
  const [isSidebarClose, setIsSidebarClose] = useState(false);
  return (
    <div className="flex h-screen">
      <Sidebar
        isSidebarClose={isSidebarClose}
        toggleSidebar={() => setIsSidebarClose(!isSidebarClose)}
      />
      <main className="bg-pink-100 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
