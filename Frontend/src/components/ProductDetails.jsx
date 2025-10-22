import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
  
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product)
    return <p style={{ textAlign: "center" }}>Loading product details...</p>;

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <h2 style={{ marginTop: "20px" }}>{product.name}</h2>
      <p style={{ fontSize: "18px", color: "green", fontWeight: "bold" }}>
        ${product.price}
      </p>
      <p style={{ marginTop: "10px", color: "#555" }}>{product.description}</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => {
            addToCart(product);
            toast.success(`🛒 ${product.name} added to Cart!`, {
              position: "bottom-center",
              autoClose: 2000,
              theme: "dark",
            });
          }}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            background: "blue",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
        <button
          onClick={() => {
            addToWishlist(product);
            toast.info(`❤️ ${product.name} added to Wishlist!`, {
              position: "bottom-center",
              autoClose: 2000,
              theme: "dark",
            });
          }}
          style={{
            padding: "10px 20px",
            background: "red",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
