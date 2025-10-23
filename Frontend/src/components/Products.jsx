
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart, ScanFaceIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../apicall/axios";

// Helper function to get full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/placeholder.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return `http://127.0.0.1:8000${imagePath}`;
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 8;
  const [priceRange, setPriceRange] = useState([0, 10000]);



  const { cartItems, addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // start loading
        const response = await api.get("products/");
        setProducts(response.data); // store fetched data
      } catch (error) {
        console.error("Error fetching products:", error); // handle error
      } finally {
        setLoading(false); // stop loading no matter what
      }
    };

    fetchProducts(); // ✅ call the function
  }, []);


  const isInWishlist = (id) => wishlistItems.some((item) => item.product?.id === id || item.id === id);
  const isInCart = (id) => cartItems.some((item) => item.product?.id === id || item.id === id);


  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "all" || product.category.toLowerCase().includes(category.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-32 h-32 border-8 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-32 h-32 border-8 border-transparent border-t-fuchsia-400 rounded-full animate-spin mx-auto"
              style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Loading Products
            </h2>
            <p className="text-gray-600">Discovering amazing products for you...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50  ">

      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-600 to-white-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              <span className="block">Discover</span>
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Amazing Products
              </span>
            </h1>

            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">


              </div>


            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for amazing products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 text-lg"
                />
              </div>

              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none bg-gradient-to-r from-violet-600 to-purple-600 text-black px-8 py-4 rounded-2xl font-semibold text-lg cursor-pointer hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <option value="all">All Categories</option>
                  <option value="men">Men's Collection</option>
                  <option value="women">Women's Collection</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>


            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-semibold text-lg">Price Range:</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 rounded-full font-semibold">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </span>
                </div>

                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="50"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                      style={{ zIndex: 1 }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                      style={{ zIndex: 2 }}
                    />
                    <div className="relative h-2 bg-gray-200 rounded-lg">
                      <div
                        className="absolute h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg"
                        style={{
                          left: `${(priceRange[0] / 10000) * 100}%`,
                          width: `${((priceRange[1] - priceRange[0]) / 10000) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Min:</label>
                    <input
                      type="number"
                      min="0"
                      max="10000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Max:</label>
                    <input
                      type="number"
                      min="0"
                      max="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="mt-6 flex items-center justify-between text-gray-600">
              <p className="text-lg">
                Showing <span className="font-bold text-violet-600">{filteredProducts.length}</span> products
                {searchTerm && (
                  <span> for "<span className="font-bold text-purple-600">{searchTerm}</span>"</span>
                )}
              </p>
              {(searchTerm || category !== "all" || priceRange[0] > 0 || priceRange[1] < 10000) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCategory("all");
                    setPriceRange([0, 10000]);
                  }}
                  className="text-gray-500 hover:text-red-500 transition-colors duration-300"
                >
                  Clear all filters ✕
                </button>
              )}
            </div>
          </div>
        </div>


        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h3>
              <p className="text-gray-600 mb-8">
                {searchTerm
                  ? `No products match "${searchTerm}". Try a different search term.`
                  : "No products available with current filters."
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategory("all");
                  setPriceRange([0, 10000]);
                }}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Products
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentProducts.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-purple-100"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >

                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>

                <div className="relative">

                  <button
                    onClick={() => {
                      if (!isInWishlist(product.id)) {
                        addToWishlist(product.id);
                        toast.info(`❤️ ${product.name} added to wishlist!`, {
                          position: "top-right",
                          autoClose: 2000,
                          theme: "dark",
                        });
                      } else {
                        const wishlistItem = wishlistItems.find(item => item.product?.id === product.id || item.id === product.id);
                        if (wishlistItem) {
                          removeFromWishlist(wishlistItem.id);
                          toast.warn(`❌ ${product.name} removed from wishlist`, {
                            position: "top-right",
                            autoClose: 2000,
                            theme: "colored",
                          });
                        }
                      }
                    }}
                    className={`absolute top-4 right-4 z-10 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isInWishlist(product.id)
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-200"
                      : "bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white"
                      }`}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${isInWishlist(product.id) ? "fill-current animate-pulse scale-110" : ""
                        }`}
                    />
                  </button>


                  <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
                    <div className="aspect-w-1 aspect-h-1 h-64 overflow-hidden">
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>


                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-700 text-sm font-semibold rounded-full border border-purple-200">
                        {product.category}
                      </span>
                    </div>
                  </Link>


                  <div className="p-6 space-y-4">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-violet-600 transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>


                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                          ₹{product.price}
                        </div>
                        <div className="text-sm text-gray-500">Free shipping</div>
                      </div>

                      <button
                        onClick={() => {
                          if (!isInCart(product.id)) {
                            addToCart(product.id, 1);
                            toast.success(`🛒 ${product.name} added to cart!`, {
                              position: "top-right",
                              autoClose: 2000,
                              theme: "dark",
                            });
                          } else {
                            toast.info(`${product.name} is already in the cart!`, {
                              position: "top-right",
                              autoClose: 2000,
                              theme: "colored",
                            });
                          }
                        }}
                        className={`group/btn relative overflow-hidden px-1 py-2 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${isInCart(product.id)
                          ? "bg-green-500 text-white"
                          : "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700"
                          }`}
                      >
                        <span className="relative z-10 flex items-center gap-2 ">
                          {isInCart(product.id) ? (
                            <span className="text-md">
                              {/* <ScanFaceIcon/> */}
                              In Cart
                            </span>
                          ) : (
                            <span className="text-md">
                             
                              Add to Cart
                            </span>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        {totalPages > 1 && (
          <div className="mt-16">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100">
              <div className="flex flex-col items-center space-y-4">
                <p className="text-gray-600">
                  Showing page <span className="font-bold text-violet-600">{currentPage}</span> of{" "}
                  <span className="font-bold text-purple-600">{totalPages}</span>
                </p>

                <div className="flex items-center space-x-2">

                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-3 rounded-xl font-semibold transition-all duration-300 ${currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>


                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 transform hover:scale-110 ${currentPage === index + 1
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg scale-110"
                          : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-violet-100 hover:to-purple-100 hover:text-violet-700"
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>


                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-3 rounded-xl font-semibold transition-all duration-300 ${currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 8px rgba(139, 92, 246, 0.3);
        }

        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 8px rgba(139, 92, 246, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Products;