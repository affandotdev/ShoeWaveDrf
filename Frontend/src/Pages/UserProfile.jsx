import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user, updatePassword } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (newPassword.trim() === '') return alert('Password cannot be empty');

    setLoading(true);
    try {
      await updatePassword(newPassword); 
      alert('Password updated successfully!');
      setNewPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h1>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-lg mb-2"><span className="font-semibold text-gray-700">Name:</span> {user?.username}</p>
        <p className="text-lg"><span className="font-semibold text-gray-700">Email:</span> {user?.email}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Change Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handlePasswordChange}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition duration-200 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
