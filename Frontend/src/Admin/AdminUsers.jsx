import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../apicall/axios';
import { useAuth } from '../context/AuthContext';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user: currentAdmin } = useAuth(); // Get current logged-in admin

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    api.get("/admin/users/")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users", err));
  };

  const handleViewDetails = (userId) => {
    navigate(`/admin/user/${userId}`);
  };

  const handleRemoveUser = (userId) => {
    // Prevent self-deletion
    if (currentAdmin && userId === currentAdmin.id) {
      alert("You cannot delete yourself!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    api.delete(`/admin/users/${userId}/`)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
        alert("User deleted successfully");
      })
      .catch(err => {
        console.error("Error removing user", err);
        alert(err.response?.data?.detail || "Failed to delete user");
      });
  };

  const handleToggleBlock = (userId, currentStatus) => {
    // Prevent self-blocking
    if (currentAdmin && userId === currentAdmin.id) {
      alert("You cannot block yourself!");
      return;
    }

    console.log('Toggling block for user:', userId, 'current status:', currentStatus);
    api.patch(`/admin/users/${userId}/`, {
      blocked: !currentStatus
    })
      .then((response) => {
        console.log('Block toggle response:', response.data);
        fetchUsers();
      })
      .catch(err => {
        console.error("Error updating user block status", err);
        console.error("Response data:", err.response?.data);
      });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        All Registered Users
      </h2>

      {users.length === 0 ? (
        <p className="text-gray-500 italic">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => {
                const isSelf = currentAdmin && user.id === currentAdmin.id;
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.username}
                      {isSelf && (
                        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-semibold">
                          You
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      <button
                        onClick={() => handleViewDetails(user.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleToggleBlock(user.id, user.blocked)}
                        disabled={isSelf}
                        className={`px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                          isSelf
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : user.blocked 
                            ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white' 
                            : 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 text-white'
                        }`}
                      >
                        {user.blocked ? 'Unblock' : 'Block'}
                      </button>
                      <button
                        onClick={() => handleRemoveUser(user.id)}
                        disabled={isSelf}
                        className={`px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                          isSelf
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white'
                        }`}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;