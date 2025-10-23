import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h1>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-lg mb-2"><span className="font-semibold text-gray-700">Name:</span> {user?.username}</p>
        <p className="text-lg"><span className="font-semibold text-gray-700">Email:</span> {user?.email}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Password Management</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">Reset Your Password</h3>
              <p className="text-sm text-gray-600 mb-4">
                For security reasons, password changes are handled through email verification. 
                Click the button below to receive a secure reset link in your email.
              </p>
              <Link 
                to="/forgot-password" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Reset Password via Email
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
