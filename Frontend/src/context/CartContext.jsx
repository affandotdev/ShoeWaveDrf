import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../apicall/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart items from backend
  const fetchCartItems = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await api.get('/cart/');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const addToCart = async (item) => {
    if (!user) {
      alert("Please login to add items to your cart");
      return;
    }

    try {
      setLoading(true);
      
      // Check if item already exists in cart
      const existingItem = cartItems.find(cartItem => cartItem.product.id === item.id);
      
      if (existingItem) {
        // Update quantity
        await api.patch(`/cart/${existingItem.id}/`, {
          quantity: existingItem.quantity + 1
        });
      } else {
        // Add new item
        await api.post('/cart/', {
          product_id: item.id,
          quantity: 1
        });
      }
      
      // Refresh cart items
      await fetchCartItems();
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };


  const updateQuantity = async (id, action) => {
    try {
      setLoading(true);
      const cartItem = cartItems.find(item => item.id === id);
      
      if (!cartItem) return;
      
      let newQuantity = cartItem.quantity;
      if (action === "increase") {
        newQuantity = cartItem.quantity + 1;
      } else if (action === "decrease") {
        newQuantity = Math.max(1, cartItem.quantity - 1);
      }
      
      if (newQuantity !== cartItem.quantity) {
        await api.patch(`/cart${id}/`, {
          quantity: newQuantity
        });
        await fetchCartItems();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/cart${id}/`);
      await fetchCartItems();
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      // Delete all cart items
      for (const item of cartItems) {
        await api.delete(`/cart/${item.id}/`);
      }
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
