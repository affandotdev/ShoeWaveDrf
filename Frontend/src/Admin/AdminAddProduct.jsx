import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apicall/axios";

const AdminAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !category) {
      alert("Please fill all required fields");
      return;
    }

    try {
    
      const res = api.get("/products/");
      const products = await res.json();

     
      const lastId = Math.max(...products.map(p => parseInt(p.id, 10) || 0));

    
      const newProduct = {
        id: String(lastId + 1), 
        name,
        price: parseFloat(price),
        image,
        category,
        description,
      };

   
      await api.post("/products/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product", error);
      alert("Failed to add product.");
    }
  };


  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
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

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
      
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-400"
              required
            />
          </div>

      
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                id="price"
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-400"
                required
              />
            </div>
          </div>

         
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              id="image"
              type="text"
              placeholder="filename.jpg"
              value={image}
              onChange={(e) => setImage(`${e.target.value}`)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-400"
            />
          </div>

      
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              id="category"
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-400"
              required
            />
          </div>

         
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-400 h-32"
            />
          </div>

         
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;