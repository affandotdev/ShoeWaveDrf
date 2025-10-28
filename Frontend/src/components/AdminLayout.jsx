import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  MdDashboard,
  MdShoppingCart,
  MdAddCircle,
  MdPeople,
  MdAssignment,
  MdPerson,
  MdLogout,
  MdEmail,
  MdMenu,
  MdClose
} from "react-icons/md";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard /> },
    { path: "/admin/products", label: "Products", icon: <MdShoppingCart /> },
    { path: "/admin/users", label: "Users", icon: <MdPeople /> },
    { path: "/admin/orders", label: "Orders", icon: <MdAssignment /> },
    { path: "/admin/contact-messages", label: "Messages", icon: <MdEmail /> }
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Hamburger Menu Button - Always Visible */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white p-3 rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300"
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
      </button>

      {/* Overlay - appears when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 backdrop-blur-sm bg-white/30 z-30"
        ></div>
      )}
  
      {/* Sidebar */}
      <aside className={`w-64 bg-gray-900 text-white flex flex-col justify-between fixed top-0 left-0 h-full shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          <h2 className="text-3xl font-extrabold text-center py-6 border-b border-gray-700">
            Admin Panel
          </h2>
          <nav className="mt-6 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
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

      {/* Main Content */}
      <main className={`flex-1 p-8 overflow-y-auto pt-20 transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-0'
      }`}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
