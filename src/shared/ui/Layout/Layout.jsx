import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar/Sidebar";

export default function Layout() {
  const [isSidebarClose, setIsSidebarClose] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-black">
      <Sidebar
        isSidebarClose={isSidebarClose}
        toggleSidebar={() => setIsSidebarClose(!isSidebarClose)}
      />
      <main className={`bg-pink-500 w-full flex-1 min-w-0`}>
        <Outlet />
      </main>
    </div>
  );
}
