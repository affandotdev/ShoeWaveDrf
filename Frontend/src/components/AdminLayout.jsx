import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  MdDashboard,
  MdShoppingCart,
  MdAddCircle,
  MdPeople,
  MdAssignment,
  MdPerson,
  MdLogout
} from "react-icons/md";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard /> },
    { path: "/admin/products", label: "Products", icon: <MdShoppingCart /> },
    { path: "/admin/users", label: "Users", icon: <MdPeople /> },
    { path: "/admin/orders", label: "Orders", icon: <MdAssignment /> }
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
  
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between fixed top-0 left-0 h-full shadow-lg">
        <div>
          <h2 className="text-3xl font-extrabold text-center py-6 border-b border-gray-700">
            Admin Panel
          </h2>
          <nav className="mt-6 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200
                  ${location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-800 hover:text-blue-400"
                  }`}
              >
                <span className="text-2xl">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-gray-700 p-4">
          <p className="text-sm mb-1">Logged in as:</p>
          <p className="font-semibold">{user?.name || "Admin"}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
          >
            <MdLogout className="text-xl" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
