
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../apicall/axios";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || item.price) * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!user) {
      alert("Please login to place an order");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your shipping address");
      return;
    }

    try {
      // Create order using Django API
      const orderData = {
        total: totalAmount,
        address: address.trim(),
        status: "Pending"
      };

      const response = await api.post("orders/", orderData);

      if (response.data) {
        // Store order details for success page
        localStorage.setItem("lastOrder", JSON.stringify({
          id: response.data.id,
          total: response.data.total,
          address: response.data.address,
          status: response.data.status,
          date: response.data.date,
          items: cartItems
        }));

        // Clear cart after successful order
        await clearCart();
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Something went wrong placing the order");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Checkout
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h8.5m-10.5-8h10"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h3>
              <p className="text-gray-600 mb-8">Add some amazing products to continue with checkout.</p>
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
          
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100 hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    Order Summary
                  </h3>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="group flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 transition-all duration-300 transform hover:scale-[1.02]"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-violet-200 to-purple-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="font-bold text-violet-700">{item.quantity}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 group-hover:text-violet-600 transition-colors duration-300">
                            {item.product?.name || item.name}
                          </h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                          ${((item.product?.price || item.price) * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">${item.product?.price || item.price} each</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t-2 border-gradient-to-r from-violet-200 to-purple-200">
                  <div className="flex justify-between items-center p-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl text-white">
                    <span className="text-2xl font-bold">Total Amount:</span>
                    <span className="text-3xl font-extrabold">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

          
            <div className="space-y-8">
        
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100 hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Shipping Address
                  </h3>
                </div>

                <div className="relative">
                  <textarea
                    className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 resize-none hover:border-violet-300"
                    rows="4"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete shipping address..."
                  />
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Free shipping on all orders</span>
                </div>
              </div>

            
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100 hover:shadow-3xl transition-all duration-500">
                <button
                  onClick={placeOrder}
                  className="group relative w-full overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl text-xl font-bold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Place Order
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </span>
                </button>

                <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <span>Secure Payment</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Money Back Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;