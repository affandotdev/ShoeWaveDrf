import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../apicall/axios";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-4 px-3">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-1">
            My Wishlist
          </h2>
          <p className="text-gray-600 text-sm">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} you love
          </p>
        </div>

      {wishlistItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <div className="mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-10 h-10 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">Your wishlist is empty</h3>
          <p className="text-gray-600 text-sm mb-4">Save items you love for later</p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Discover Products
          </button>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatePresence>
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative h-40 bg-gray-100 overflow-hidden">
                  <motion.img
                    src={getImageUrl(item.product?.image || item.image)}
                    alt={item.product?.name || item.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md group-hover:scale-110"
                    title="Remove from wishlist"
                  >
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="text-sm font-bold text-gray-800 mb-1 line-clamp-2 min-h-[2.5rem]">
                    {item.product?.name || item.name}
                  </h3>
                  <p className="text-lg font-black bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    ₹{(item.product?.price || item.price)?.toLocaleString()}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-1.5">
                    <motion.button
                      onClick={() => {
                        const productId = item.product?.id || item.id;
                        addToCart(productId);
                        removeFromWishlist(item.id);
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-sm"
                    >
                      Add to Cart
                    </motion.button>
                    <motion.button
                      onClick={() => navigate(`/products/${item.product?.id || item.id}`)}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
                      title="View details"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      </div>
    </div>
  );
};

export default Wishlist;
