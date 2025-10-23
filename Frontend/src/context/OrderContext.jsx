import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import api from '../apicall/axios';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserOrders = async () => {
    if (!user) {
      throw new Error('User must be logged in to fetch orders');
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("access");
      const response = await api.get('orders/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data);
      return response.data;

    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    if (!user) {
      throw new Error('User must be logged in to create an order');
    }

    try {
      const token = localStorage.getItem("access");
      const response = await api.post('orders/', orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const createdOrder = response.data;
      setOrders(prev => [createdOrder, ...prev]);
      
      return { success: true, order: createdOrder };

    } catch (error) {
      console.error('Error creating order:', error);
      return { success: false, message: error.message };
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("access");
      const response = await api.patch(`orders/${orderId}/`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedOrder = response.data;

      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      return { success: true, order: updatedOrder };

    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, message: error.message };
    }
  };

  const cancelOrder = async (orderId) => {
    return updateOrderStatus(orderId, 'cancelled');
  };

  const getOrderById = async (orderId) => {
    try {
      const token = localStorage.getItem("access");
      const response = await api.get(`orders/${orderId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const order = response.data;

      if (String(order.user) !== String(user?.id)) {
        throw new Error('Access denied: This order does not belong to you');
      }

      return { success: true, order };

    } catch (error) {
      console.error('Error fetching order:', error);
      return { success: false, message: error.message };
    }
  };

  const reorder = async (orderId) => {
    try {
      const { success, order, message } = await getOrderById(orderId);
      if (!success) {
        return { success: false, message };
      }

      const reorderData = {
        items: order.items,
        total: order.total,
        shippingAddress: order.shippingAddress,
      };

      return await createOrder(reorderData);

    } catch (error) {
      console.error('Error reordering:', error);
      return { success: false, message: error.message };
    }
  };

  const value = {
    orders,
    loading,
    fetchUserOrders,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    getOrderById,
    reorder
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
