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
        maxWidth: '350px',
        margin: '30px auto',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        backgroundColor: '#f9f9f9'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '8px', color: '#333', fontSize: '22px' }}>
        Welcome Back
      </h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px', fontSize: '13px' }}>
        Sign in to your account
      </p>

      <form onSubmit={handleSubmit}>
        {registrationMessage && (
          <div
            style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '8px',
              borderRadius: '4px',
              marginBottom: '15px',
              border: '1px solid #c3e6cb',
              fontSize: '13px'
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
              padding: '8px',
              borderRadius: '4px',
              marginBottom: '15px',
              border: '1px solid #f5c6cb',
              fontSize: '13px'
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', fontSize: '13px' }}>
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
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', fontSize: '13px' }}>
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
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <div style={{ textAlign: 'right', marginTop: '4px' }}>
            <Link 
              to="/forgot-password" 
              style={{ 
                color: '#007bff', 
                textDecoration: 'none',
                fontSize: '12px'
              }}
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px', color: '#666', fontSize: '13px' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
          Create one here
        </Link>
      </p>
    </div>
  );
};

export default Login;
