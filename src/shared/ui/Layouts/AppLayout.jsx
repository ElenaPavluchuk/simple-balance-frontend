import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../Sidebar/Sidebar";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-pink-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <main
        className={`bg-pink-100 w-full flex-1 min-w-0 mx-5 my-10 ${isSidebarOpen ? "hidden sm:block" : ""}`}
      >
        <Outlet />
      </main>
    </div>
  );
}
