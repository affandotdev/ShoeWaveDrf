import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">shoeWave</h2>
            <p className="text-gray-400 text-sm">
              
            </p>
          </div>

    
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/products" className="hover:text-blue-400">Shop</Link></li>
              <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>

       
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400">FAQ</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Returns</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Shipping</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Privacy Policy</Link></li>
            </ul>
          </div>

     
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
            <p className="text-gray-400 text-sm mb-4">Get the latest updates and offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-l-md text-gray-800 focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
                Go
              </button>
            </form>
          </div>
        </div>

    
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} shoeWave. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
