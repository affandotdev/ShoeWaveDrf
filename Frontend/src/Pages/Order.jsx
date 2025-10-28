import React, { useEffect } from 'react';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserOrders = () => {
  const { user } = useAuth();
  const { orders, loading, fetchUserOrders, cancelOrder } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-pink-400 rounded-full animate-spin mx-auto" 
                 style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Loading Your Orders
            </p>
            <p className="text-gray-500">Please wait while we fetch your order history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 px-6 py-3 bg-blue-300 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span className="font-medium">Back</span>
            </button>

            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Hello {user?.username}!
              </h1>
            </div>

            <div className="w-24"></div>
          </div>
        </div>
      </div>

      {/* Order Section */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <div className="px-8 py-6">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-2xl font-bold text-black">Your Orders</h2>
              </div>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M8 11v6a2 2 0 002 2h4a2 2 0 002-2v-6M8 11h8"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h3>
              <p className="text-gray-600 mb-8">Start shopping to see your orders here!</p>
              <button 
                onClick={() => navigate('/products')}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div key={order.id} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 via-gray-600 to-gray-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">Order #{order.id}</h3>
                            <p className="text-gray-600">Total: ${order.total}</p>
                            <p className="text-gray-600">Address: {order.address}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-lg transform group-hover:scale-105 transition-all duration-300 ${
                            order.status === 'Delivered'
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-200'
                              : order.status === 'Cancelled'
                              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-200'
                              : order.status === 'Shipping'
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-blue-200'
                              : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-yellow-200'
                          }`}>
                            <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                              order.status === 'Delivered' ? 'bg-green-200' :
                              order.status === 'Cancelled' ? 'bg-red-200' :
                              order.status === 'Shipping' ? 'bg-blue-200' : 'bg-yellow-200'
                            }`}></div>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                          </svg>
                          Order Items
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="group/item bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:from-gray-50 hover:to-black-50 transition-all duration-300 border border-gray-200 hover:border-purple-200">
                              <div className="flex items-center space-x-4">
                                <div className="relative">
                                  <img
                                    src={item.product?.image || item.image}
                                    alt={item.product?.name || item.name}
                                    className="w-16 h-16 object-cover rounded-lg shadow-md group-hover/item:shadow-lg transition-all duration-300"
                                  />
                                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{idx + 1}</span>
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-800 group-hover/item:text-purple-700 transition-colors duration-300">
                                    {item.product?.name || item.name}
                                  </h5>
                                  <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                                  <p className="text-gray-600 text-sm">Price: ${item.product?.price || item.price}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="text-sm">Order Status: <span className="font-medium">{order.status}</span></span>
                        </div>

                        <div>
                          {order.status !== 'Cancelled' &&
                          order.status !== 'Delivered' ? (
                            <button
                              onClick={() => cancelOrder(order.id)}
                              className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                              <svg className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                              Cancel Order
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {order.status === 'Cancelled' ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                )}
                              </svg>
                              <span>{order.status === 'Cancelled' ? 'Order Cancelled' : 'Order Delivered'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;