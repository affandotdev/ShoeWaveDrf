import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingCart, Heart } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/30 backdrop-blur-xl shadow-xl sticky top-0 z-50 border-b border-white/20 transition-all duration-500 animate-fadeDown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
      
          <Link
            to="/"
            className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text hover:scale-110 transition-transform duration-300"
          >
            shoeWave
          </Link>

         
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Products', 'About', 'order'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="relative text-gray-800 hover:text-blue-700 font-medium py-2 px-3 rounded-lg hover:bg-blue-50/40 transition-all duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-500"></span>
              </Link>
            ))}
          </nav>

         
          <div className="flex items-center space-x-6">
           
            <Link
              to="/wishlist"
              className="relative group p-2 rounded-full hover:bg-red-100/40 transition-all duration-300"
            >
              <Heart className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-transform duration-300 group-hover:scale-125" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold shadow-lg animate-bounce">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

        
            <Link
              to="/cart"
              className="relative group p-2 rounded-full hover:bg-blue-100/40 transition-all duration-300"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-transform duration-300 group-hover:scale-125" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full px-2 py-0.5 font-bold shadow-lg animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </Link>

           
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-gray-800 font-medium px-3 py-1 rounded-full bg-white/50 shadow-sm hover:bg-white transition"
                >
                  Hi, <span className="font-bold text-blue-700">{user.username}</span>
                </button>

           
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg animate-fadeIn z-50">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/user-profile');
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 transition"
                    >
                      Profile
                    </button>

                  
                    {user.role === 'admin' && (
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate('/admin');
                        }}
                        className="block w-full text-left px-4 py-2 text-purple-700 font-semibold hover:bg-purple-50 transition"
                      >
                        Admin Panel
                      </button>
                    )}

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
