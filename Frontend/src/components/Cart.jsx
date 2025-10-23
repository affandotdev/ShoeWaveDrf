import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// Helper function to get full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/placeholder.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return `http://127.0.0.1:8000${imagePath}`;
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || item.price || 0) * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen ">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700 ">
        Your Cart 🛒
      </h2>

      {cartItems.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 text-center text-lg"
        >
          Your cart is empty. Start shopping!
        </motion.p>
      ) : (
        <>
          <AnimatePresence>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center justify-between bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
                >
                  <div className="flex items-center gap-6">
                    <motion.img
                      src={getImageUrl(item.product?.image || item.image)}
                      alt={item.product?.name || item.name}
                      className="w-24 h-24 rounded-lg object-cover"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {item.product?.name || item.name}
                      </h3>
                      <p className="text-gray-600">₹{item.product?.price || item.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 font-bold hover:text-red-700"
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex justify-between items-center gap-4"
          >
            <h3 className="text-2xl font-bold text-gray-800">
              Total: ₹{totalAmount.toFixed(2)}
            </h3>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Cart;
