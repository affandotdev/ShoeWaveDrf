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

const addToWishlist = async (productId) => {
  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    setLoading(true);

    // Check if item already exists
    const existingItem = wishlistItems.find(
      item => (item.product?.id || item.id) === productId
    );

    if (!existingItem) {
      // Include user in payload
      const payload = {
        product_id: productId
      };

      const token = localStorage.getItem("access"); // JWT token
      await api.post('wishlist/', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await fetchWishlistItems();
    } else {
      // If already in wishlist → remove it (toggle off)
      await removeFromWishlist(existingItem.id);
    }

  } catch (error) {
    console.error('Error adding/removing wishlist item:', error);
    alert(error.response?.data?.detail || 'Failed to update wishlist');
  } finally {
    setLoading(false);
  }
}

const removeFromWishlist = async (wishlistItemId) => {
  try {
    setLoading(true);
    await api.delete(`wishlist/${wishlistItemId}/`);
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
