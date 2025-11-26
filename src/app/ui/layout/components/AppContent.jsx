import { Outlet } from "react-router";

export default function AppContent() {
  return (
    <main className="flex-1 m-5 mb-3 p-8 bg-fuchsia-50 rounded-lg shadow-sm">
      {/* Content from pages will be heare */}
      <Outlet />
    </main>
  );
}
