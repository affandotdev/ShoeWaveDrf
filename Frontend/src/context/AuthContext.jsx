import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../apicall/axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);


      verifyUserStatus(parsedUser);
    }
    setLoading(false);
  }, []);

const verifyUserStatus = async (currentUser) => {
  if (!currentUser) return;
  try {
    const response = await api.get(`/users/${currentUser.id}/`);
    const latestUser = response.data;

    // Check if user is blocked (blocked is a boolean field)
    if (latestUser.blocked === true) {
      alert('Your account has been blocked by the admin.');
      logout();
      window.location.href = '/login';
    }

  } catch (error) {
    console.error('Error checking user status:', error);
  }
}

  const register = async (name, email, password) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      console.log("Attempting registration with:", { username: name.trim(), email: cleanEmail });

      const response = await api.post("/register/", {
        username: name.trim(),
        email: cleanEmail,
        password: password
      });

      console.log("Registration response:", response.data);
      const userData = response.data;
      return { success: true, user: userData };

    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.email) {
        return { success: false, message: "Email already exists" };
      }
      if (error.response?.data?.username) {
        return { success: false, message: "Username already exists" };
      }
      if (error.response?.data?.password) {
        return { success: false, message: error.response.data.password[0] };
      }
      if (error.response?.status === 400) {
        return { success: false, message: "Invalid registration data" };
      }
      return { success: false, message: "Something went wrong during registration" };
    }
  };

  const login = async (email, password) => {
    try {
      const cleanEmail = email.trim().toLowerCase();

      const response = await api.post("/login/", {
        email: cleanEmail,
        password: password
      });

      const { access, refresh, user } = response.data;
      
      // Store tokens
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      
      // Check if user is blocked (blocked is a boolean field)
      if (user.blocked === true) {
        return { success: false, message: "Your account has been blocked by the admin." };
      }

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));

      return { success: true, user: user };

    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        return { success: false, message: "Invalid email or password" };
      }
      return { success: false, message: "Something went wrong during login" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  };

  const updatePassword = async (newPassword) => {
    if (!user) throw new Error('No user found');

    try {
      await api.patch(`/users/${user.id}/`, {
        password: newPassword
      });

      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


