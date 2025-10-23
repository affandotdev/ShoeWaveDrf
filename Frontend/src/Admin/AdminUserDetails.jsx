import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../apicall/axios";
import { useAuth } from "../context/AuthContext"; // Assuming you have an auth context

const AdminUserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user: currentAdmin } = useAuth(); // Current logged-in admin

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRes, ordersRes] = await Promise.all([
          api.get(`/admin/users/${id}/`),
          api.get(`/admin/orders/`),
        ]);
        setUser(userRes.data);

        const userOrders = ordersRes.data.filter(
          (order) => String(order.user) === String(id)
        );
        setOrders(userOrders);
      } catch (error) {
        console.error("Error loading data:", error);
        alert("Failed to load user details. Redirecting...");
        navigate("/error"); // Redirect to error page
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  // Toggle block/unblock
  const toggleBlockStatus = async () => {
    if (user.id === currentAdmin.id) return; // Prevent self-block

    const confirmMsg = user.blocked
      ? "Are you sure you want to unblock this user?"
      : "Are you sure you want to block this user?";
    if (!window.confirm(confirmMsg)) return;

    try {
      await api.patch(`/admin/users/${user.id}/`, { blocked: !user.blocked });
      setUser({ ...user, blocked: !user.blocked });
    } catch (error) {
      console.error("Error updating user status", error);
      alert(error.response?.data?.detail || "Failed to update user status");
    }
  };

  // Delete user
  const deleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/users/${user.id}/`);
      alert("User deleted successfully");
      navigate("/admin/users");
    } catch (error) {
      console.error("Error deleting user", error);
      alert(error.response?.data?.detail || "Failed to delete user");
    }
  };

  if (loading || !user) {
    return (
      <p className="p-8 text-center text-gray-600">Loading user data...</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate("/admin/users")}
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow hover:shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to All Users
      </button>

      {/* User Details */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            User Details
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong className="text-gray-900">ID:</strong> {user.id}
            </p>
            <p>
              <strong className="text-gray-900">Name:</strong> {user.username}
            </p>
            <p>
              <strong className="text-gray-900">Email:</strong> {user.email}
            </p>
            <p className="flex items-center">
              <strong className="text-gray-900">Blocked:</strong>
              <span
                className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                  user.blocked
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {user.blocked ? "blocked" : "active"}
              </span>
            </p>
            {user.id === currentAdmin.id && (
              <p className="text-sm text-gray-500 italic mt-1">
                You cannot block yourself
              </p>
            )}
          </div>

          <div className="flex gap-4 mt-6">
            {/* Block/Unblock */}
            <button
              onClick={toggleBlockStatus}
              disabled={user.id === currentAdmin.id}
              className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 ${
                user.blocked
                  ? "bg-green-600 hover:bg-green-700 shadow hover:shadow-md"
                  : "bg-red-600 hover:bg-red-700 shadow hover:shadow-md"
              } ${user.id === currentAdmin.id ? "bg-gray-400 cursor-not-allowed" : ""}`}
            >
              {user.blocked ? "Unblock User" : "Block User"}
            </button>

            {/* Delete */}
            <button
              onClick={deleteUser}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-medium transition-all duration-200 shadow hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Delete User
            </button>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            User Orders
          </h3>
          {orders.length === 0 ? (
            <p className="text-gray-500 italic">No orders found for this user.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {order.id}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-800">
                        {order.items && order.items.length > 0 ? (
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <span className="font-medium">
                                  {item.product ? item.product.name : "Unknown Product"}
                                </span>
                                <span className="text-gray-500 text-xs">
                                  x {item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">No products</span>
                        )}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-semibold">
                        ₹{parseFloat(order.total || 0).toFixed(2)}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 capitalize">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Shipping"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetails;
