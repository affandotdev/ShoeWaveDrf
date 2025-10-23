import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../apicall/axios";
import { toast } from "react-toastify";

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

const addToCart = async (productId, quantity = 1) => {
  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    setLoading(true);
    const payload = {
      product_id: productId,  // ✅ product ID
      quantity: quantity     // ✅ quantity
    };

    const token = localStorage.getItem("access");

    const response = await api.post("/cart/", payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Refresh cart items from backend
    await fetchCartItems();
    

  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error(error.response?.data?.detail || "Failed to add to cart", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored"
    });
  } finally {
    setLoading(false);
  }
};


const updateQuantity = async (itemId, newQuantity) => {
  if (newQuantity < 1) {
    console.warn("Quantity must be at least 1");
    return;
  }

  try {
    const token = localStorage.getItem("access");
    if (!token) throw new Error("User not authenticated");

    // PATCH request to backend
    const response = await api.patch(
      `/cart/${itemId}/`,
      { quantity: newQuantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update local cart state
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: response.data.quantity } : item
      )
    );

    toast.success("Cart quantity updated!", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
    });

  } catch (error) {
    console.error("Error updating quantity:", error.response?.data || error.message);
    toast.error(
      error.response?.data?.detail || "Failed to update cart quantity",
      { position: "top-right", autoClose: 2000, theme: "colored" }
    );
  }
};

  const removeFromCart = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/cart/${id}/`);
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
    
      const deletePromises = cartItems.map(item => 
        api.delete(`/cart/${item.id}/`)
      );
      
      await Promise.all(deletePromises);
      
      // Clear local state immediately
      setCartItems([]);
      
      toast.success("Cart cleared successfully!", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart', {
        position: "top-right",
        autoClose: 2000,
        theme: "colored"
      });
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
