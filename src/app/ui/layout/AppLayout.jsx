import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link } from "react-router";

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sider - боковая панель */}
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Логотип / заглушка */}
        <div className="h-16 flex items-center justify-center border-b">
          <div className="bg-gray-300 border-2 border-dashed rounded-xl w-10 h-10" />
        </div>

        {/* Меню */}
        <nav className="flex-1 pt-4">
          <ul className="space-y-2 px-3">
            {[
              {
                key: "1",
                label: "Dashboard",
                icon: <ChevronRight className="w-5 h-5" />,
                path: "/",
              },
              {
                key: "2",
                label: "Income",
                icon: <ChevronRight className="w-5 h-5" />,
                path: "/income",
              },
              {
                key: "3",
                label: "Expense",
                icon: <ChevronRight className="w-5 h-5" />,
                path: "/expense",
              },
            ].map((item) => (
              <li key={item.key}>
                {/* <a
                  href="#"
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                    ${
                      item.key === "1"
                        ? "bg-teal-100 text-teal-800 font-medium"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <span className={`${collapsed ? "mx-auto" : ""}`}>
                    {item.icon}
                  </span>
                  {!collapsed && <span>{item.label}</span>}
                </a> */}
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                    ${
                      item.key === "1"
                        ? "bg-teal-100 text-teal-800 font-medium"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  {" "}
                  <span className={`${collapsed ? "mx-auto" : ""}`}>
                    {item.icon}
                  </span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Основная часть Layout */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-teal-100 shadow-sm flex items-center">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-16 h-16 flex items-center justify-center hover:bg-teal-200 transition-colors text-gray-700"
          >
            {collapsed ? (
              <Menu className="w-6 h-6" />
            ) : (
              <X className="w-6 h-6" />
            )}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 m-5 mb-3 p-8 bg-fuchsia-50 rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold mb-4">Content</h1>
          <p>Здесь будет основной контент вашего приложения.</p>
        </main>
      </div>
    </div>
  );
}
