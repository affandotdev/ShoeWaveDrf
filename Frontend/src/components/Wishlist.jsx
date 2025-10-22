import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gradient-to-br from-pink-50 to-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-pink-600">
        Your Wishlist ❤️
      </h2>

      {wishlistItems.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 text-center text-lg"
        >
          No items in wishlist yet.
        </motion.p>
      ) : (
        <AnimatePresence>
          <div className="space-y-6">
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-between bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
              >
                <div className="flex items-center gap-6">
                  <motion.img
                    src={item.product?.image || item.image}
                    alt={item.product?.name || item.name}
                    className="w-24 h-24 rounded-lg object-cover"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.product?.name || item.name}
                    </h3>
                    <p className="text-gray-600">${item.product?.price || item.price}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <motion.button
                    onClick={() => {
                      // Pass the product data to addToCart
                      const productData = item.product || item;
                      addToCart(productData);
                      removeFromWishlist(item.id);
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Move to Cart
                  </motion.button>
                  <motion.button
                    onClick={() => removeFromWishlist(item.id)}
                    whileTap={{ scale: 0.9 }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Wishlist;
