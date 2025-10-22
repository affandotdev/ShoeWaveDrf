import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Full name is required');
      return false;
    }
    
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
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
      console.log("Submitting registration form:", formData);
      const result = await register(formData.name, formData.email, formData.password);
      console.log("Registration result:", result);
      
      if (result.success) {
        setSuccess(true);
        setError('');
        
        
        setTimeout(() => {
          navigate("/login", { 
            state: { 
              message: "Registration successful! Please login with your credentials." 
            }
          });
        }, 2000);
        
      } else {
        setError(result.message || 'Registration failed');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container" style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#333' }}>
        Create Account
      </h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Join us today!
      </p>

      <form onSubmit={handleSubmit}>
   
        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '20px',
            border: '1px solid #f5c6cb'
          }}>
            ⚠️ {error}
          </div>
        )}

      
        {success && (
          <div style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '20px',
            border: '1px solid #c3e6cb'
          }}>
            ✅ Registration successful! Redirecting to login...
          </div>
        )}


        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
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

    
        <div style={{ marginBottom: '20px' }}>
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

       
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
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
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

   
      <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
        Already have an account?{' '}
        <Link 
          to="/login" 
          style={{ color: '#007bff', textDecoration: 'none' }}
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
};

export default Register;