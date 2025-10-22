import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";


import Home from "./components/Home";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import Products from "./components/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderSuccessPage from "./Pages/OrderSuccessPage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ProductDetails from "./components/ProductDetails";
import UserOrders from "./Pages/Order";
import UserProfile from "./Pages/UserProfile";


import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminProducts from "./Admin/AdminProducts";
import AdminAddProduct from "./Admin/AdminAddProduct";
import AdminEditProduct from "./Admin/AdminEditProduct";
import AdminUsers from "./Admin/AdminUsers";
import AdminUserDetails from "./Admin/AdminUserDetails";
import AdminOrders from "./Admin/AdminOrders";


import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ErrorPage from "./Pages/ErrorPage";

function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  const isAuthenticated = !!user;
  const isAdminRoute = location.pathname.toLowerCase().startsWith("/admin");

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", fontSize: "20px" }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>

        <Route
          path="/"
          element={
            isAuthenticated && user.role === "admin" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Home />
            )
          }
        />


        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<div>FAQ Page</div>} />


        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate
                to={user.role === "admin" ? "/admin/dashboard" : "/"}
                replace
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
        />


        {isAuthenticated && user.role === "user" && (
          <>
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/order" element={<UserOrders />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="*" element={<ErrorPage />} />
          </>
        )}


        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="add-product" element={<AdminAddProduct />} />
          <Route path="edit-product/:id" element={<AdminEditProduct />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/user/:id" element={<AdminUserDetails />} />
          <Route path="orders" element={<AdminOrders />} />

        </Route>
      </Routes>

      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
