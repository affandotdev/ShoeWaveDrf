import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../apicall/axios";

// Helper function to get full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return "/images/placeholder.jpg"; // fallback placeholder
  if (imagePath.startsWith("http")) return imagePath;
  return `http://127.0.0.1:8000${imagePath}`;
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cartItems, addToCart } = useCart();
  const { wishlistItems, addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}/`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const isInCart = cartItems?.some(
      (item) => item.product?.id === product.id || item.id === product.id
    );

    if (isInCart) {
      toast.info("🛒 Product already in cart!", { position: "top-right" });
    } else {
      addToCart(product.id, 1);
      toast.success(`🛒 ${product.name} added to cart!`, { position: "top-right" });
    }
  };

  const handleAddToWishlist = () => {
    if (!product) return;

    const isInWishlist = wishlistItems?.some(
      (item) => item.product?.id === product.id || item.id === product.id
    );

    if (isInWishlist) {
      toast.info("❤️ Already in your wishlist!", { position: "top-right" });
    } else {
      addToWishlist(product.id);
      toast.success(`❤️ ${product.name} added to wishlist!`, { position: "top-right" });
    }
  };

  if (!product)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading product details...
      </p>
    );

  return (
    <div style={{ maxWidth: "900px", margin: "50px auto", padding: "20px" }}>
      {/* Product Image */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "auto",
            borderRadius: "10px",
            objectFit: "cover",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />
      </div>

      {/* Product Info */}
      <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>{product.name}</h2>
      <p style={{ fontSize: "22px", fontWeight: "bold", color: "green" }}>
        ₹{product.price}
      </p>
      <p style={{ marginTop: "15px", color: "#555", lineHeight: "1.6" }}>
        {product.description}
      </p>

      {/* Buttons */}
      <div style={{ marginTop: "25px", display: "flex", gap: "15px" }}>
        <button
          onClick={handleAddToCart}
          style={{
            padding: "12px 25px",
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Add to Cart
        </button>

        <button
          onClick={handleAddToWishlist}
          style={{
            padding: "12px 25px",
            background: "#DC2626",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Add to Wishlist
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default ProductDetails;
