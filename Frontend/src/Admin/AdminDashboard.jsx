import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from "recharts";
import api from "../apicall/axios";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);
  const [deliveryChartData, setDeliveryChartData] = useState([]);
  const [totals, setTotals] = useState({ total_sales: 0, total_orders: 0, total_users: 0, total_products: 0, total_admins: 0 });
  const [topProducts, setTopProducts] = useState([]);

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsRes = await api.get('/admin/analytics/');
        const { totals, monthly_sales, status_counts, top_products } = analyticsRes.data;

        // Transform backend monthly_sales/status for charts
        const salesData = monthly_sales;
        const deliveryChartData = Object.entries(status_counts).map(([status, count]) => ({ name: status, value: count }));

        // Store for charts in component state
        setSalesData(salesData);
        setDeliveryChartData(deliveryChartData);
        setTotals(totals);
        setTopProducts(top_products || []);
      } catch (error) {
        console.error("Error fetching analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <p className="text-xl text-slate-600 font-semibold">Loading Dashboard...</p>
      </div>
    );
  }


  const totalSales = totals.total_sales;
  const totalOrders = totals.total_orders;
  const totalUsers = totals.total_users;
  const totalProducts = totals.total_products;
  const totalAdmins = totals.total_admins;


  // salesData, deliveryChartData now from backend

  return (
  
    <div className="bg-slate-50 min-h-screen">
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 text-center mb-8">Admin Dashboard 📊</h1>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Revenue</h2>
            <p className="text-1xl font-bold text-red-500 mt-3">₹{totalSales.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Orders</h2>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Users</h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">{totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Products</h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{totalProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Admins</h2>
            <p className="text-3xl font-bold text-rose-600 mt-2">{totalAdmins}</p>
          </div>
        </div>

    
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
    
          <div className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Monthly Sales Trend</h2>
            <div className="h-[300px]">
              {salesData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" fontSize={12} tick={{ fill: '#6B7280' }} />
                    <YAxis fontSize={12} tick={{ fill: '#6B7280' }} />
                    <Tooltip wrapperClassName="shadow-lg rounded-md" cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }} />
                    <Bar dataKey="sales" fill="#4F46E5" barSize={30} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">No sales data available</div>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Order Delivery Status</h2>
            <div className="h-[300px]">
              {deliveryChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deliveryChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      dataKey="value"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {deliveryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend iconSize={12} />
                    <Tooltip wrapperClassName="shadow-lg rounded-md" />
                  </PieChart>

                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">No delivery status data</div>
              )}
            </div>
          </div>
        </div>


        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Top Selling Products 🔥</h2>
          {topProducts.length > 0 ? (
            <ul className="divide-y divide-slate-200">
              {topProducts.map((prod, idx) => (
                <li key={idx} className="flex justify-between items-center py-3 px-2 hover:bg-slate-50 rounded-md">
                  <span className="text-slate-600 font-medium">{prod.name}</span>
                  <span className="font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full text-sm">{prod.qty} sold</span>
                </li>
              ))}
            </ul>
          ) : <p className="text-center text-slate-500 py-4">No product sales data found.</p>}
        </div>

   
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link className="bg-indigo-600 text-white p-6 text-center rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg" to="/admin/products">Manage Products</Link>
          <Link className="bg-emerald-600 text-white p-6 text-center rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-colors duration-300 shadow-md hover:shadow-lg" to="/admin/users">Manage Users</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;