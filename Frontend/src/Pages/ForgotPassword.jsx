// ForgotPassword.jsx
import React, { useState } from 'react';
import api from '../apicall/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const requestOtp = async () => {
    try {
      const res = await api.post('/password-reset/request-otp/', { email });
      setMessage(res.data.message);
      setOtpSent(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP.');
      setMessage('');
    }
  };

  const verifyOtpAndReset = async () => {
    try {
      const res = await api.post('/password-reset/verify-otp/', {
        email,
        otp,
        new_password: newPassword,
      });
      alert(res.data.message);
      setOtpSent(false);
      setEmail('');
      setOtp('');
      setNewPassword('');
      setMessage('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {otpSent ? 'Verify OTP & Reset Password' : 'Forgot Password?'}
          </h1>
          <p className="text-gray-600">
            {otpSent
              ? 'Enter the OTP sent to your email and set a new password.'
              : 'Enter your email to receive an OTP for password reset.'}
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {!otpSent ? (
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={requestOtp}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={verifyOtpAndReset}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
