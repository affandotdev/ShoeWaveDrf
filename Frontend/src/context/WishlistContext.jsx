import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../apicall/axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist items from backend
  const fetchWishlistItems = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await api.get('wishlist/');
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishlistItems();
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const addToWishlist = async (product) => {
    if (!user) {
      alert("Please login to add items to your wishlist");
      return;
    }

    try {
      setLoading(true);
      
      // Check if item already exists in wishlist
      const existingItem = wishlistItems.find(item => item.product.id === product.id);
      
      if (!existingItem) {
        await api.post('wishlist/', {
          product: product.id
        });
        await fetchWishlistItems();
      } else {
        alert('Item already in wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add item to wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      setLoading(true);
      await api.delete(`wishlist/${id}/`);
      await fetchWishlistItems();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      alert('Failed to remove item from wishlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

export default WishlistContext;
