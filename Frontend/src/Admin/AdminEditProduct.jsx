import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../apicall/axios";

const AdminEditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product", err);
        setLoading(false);
      });
  }, [id]);

const handleUpdate = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('brand', product.brand);
  formData.append('gender', product.gender);
  formData.append('price', product.price);
  formData.append('category', product.category);
  formData.append('description', product.description || '');

  // Only append file if user selected a new image
  if (file) {
    formData.append('image', file);
  }

  try {
    const response = await api.put(`/products/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    toast.success("Product updated successfully!");
    setTimeout(() => {
      navigate("/admin/products");
    }, 1000);
  } catch (error) {
    console.error("Update failed", error.response?.data || error.message);
    toast.error(error.response?.data?.detail || "Failed to update product");
  }
};


  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
            <button
              onClick={() => navigate("/admin/products")}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Products
            </button>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="px-6 py-4 space-y-6">
      
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
              <input
              id="name"
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-400"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Brand Field */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
              Brand <span className="text-red-500">*</span>
            </label>
            <input
              id="brand"
              type="text"
              value={product.brand}
              onChange={(e) => setProduct({ ...product, brand: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-400"
              placeholder="Enter brand name"
              required
            />
          </div>

          {/* Gender Field */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              value={product.gender}
              onChange={(e) => setProduct({ ...product, gender: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-400"
              required
            >
              <option value="">Select gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

     
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                id="price"
                type="number"
                step="0.01"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-400"
                placeholder="0.00"
                required
              />
            </div>
          </div>

     
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-400"
            />
            {file && (
              <p className="mt-1 text-sm text-gray-500">New image selected: {file.name}</p>
            )}
          </div>

   
          {product.image && !file && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Image</label>
              <div className="flex justify-center p-4 bg-gray-50 rounded-md border border-gray-200 hover:border-blue-300 transition-colors duration-200">
                <img
                  src={product.image}
                  alt="Current product"
                  className="max-h-48 object-contain rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            </div>
          )}

      
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              id="category"
              type="text"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-400"
              placeholder="Enter category"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={product.description || ''}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-400 h-32"
              placeholder="Enter product description"
            />
          </div>

      
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Update Product
            </button>
          </div>
        </form>
      </div>

 
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
    </div>
  );
};

export default AdminEditProduct;
