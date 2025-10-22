import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const registrationMessage = location.state?.message;

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        const loggedUser = result.user;

      
        if (loggedUser.status === 'blocked') {
          setError('Your account has been blocked. Contact admin.');
          setLoading(false);
          return;
        }

     
        localStorage.setItem('user', JSON.stringify(loggedUser));

 
        if (loggedUser.role === 'admin') {
          navigate('/admin'); 
        } else {
          navigate('/products'); 
        }
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-container"
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#333' }}>
        Welcome Back
      </h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Sign in to your account
      </p>

      <form onSubmit={handleSubmit}>
        {registrationMessage && (
          <div
            style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '20px',
              border: '1px solid #c3e6cb'
            }}
          >
            ✅ {registrationMessage}
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '20px',
              border: '1px solid #f5c6cb'
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
          Create one here
        </Link>
      </p>
    </div>
  );
};

export default Login;
