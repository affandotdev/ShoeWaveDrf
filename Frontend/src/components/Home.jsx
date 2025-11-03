import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apicall/axios";

import { getImageUrl } from "../apicall/axios";

const Home = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [productsVisible, setProductsVisible] = useState(false);
  const [topProducts, setTopProducts] = useState([]);
  const [loadingTopProducts, setLoadingTopProducts] = useState(true);

  const navigate = useNavigate();

  const handleVideoLoad = () => setVideoLoaded(true);

  // Demo brand logos
  const brands = [
    { name: "Nike", logo: "/images/nike.png" },
    { name: "Adidas", logo: "/images/adidas.png" },
    { name: "Puma", logo: "/images/puma.png" },
    { name: "Reebok", logo: "/images/reebok.png" },
    { name: "New Balance", logo: "/images/newbalance.png" },
  ];

  // Fetch top-selling or fallback products
  useEffect(() => {
    const productsTimer = setTimeout(() => setProductsVisible(true), 1500);

    const fetchTopProducts = async () => {
      try {
        const res = await api.get("/products/top-selling/");
        if (res.data && res.data.length > 0) {
          setTopProducts(res.data);
        } else {
          const allProducts = await api.get("/products/");
          setTopProducts(allProducts.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching top-selling products:", error);
        try {
          const allProducts = await api.get("/products/");
          setTopProducts(allProducts.data.slice(0, 3));
        } catch (err) {
          console.error("Error fetching fallback products:", err);
          setTopProducts([]);
        }
      } finally {
        setLoadingTopProducts(false);
      }
    };

    fetchTopProducts();
    return () => clearTimeout(productsTimer);
  }, []);

  return (
    <section className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 min-h-screen flex flex-col items-center justify-center px-3 py-4">

      {/* Hero Video Section */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden rounded-2xl shadow-xl">
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ${
            videoLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          poster="/images/product 1.jpeg"
        >
          <source src="/images/Nike Air Max 270 - Animation - Trim.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900/60 via-indigo-900/40 to-purple-900/60 z-10"></div>

        {!videoLoaded && (
          <img
            src="/images/product 1.jpeg"
            alt="Premium Sneakers"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}

        <div className="relative z-20 text-center px-3 transform transition-all duration-1000 hover:scale-105">
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-none drop-shadow-xl animate-productBob bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
            shoe
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Wave
            </span>
          </h1>
          <p className="text-base text-white/90 mt-3 font-medium drop-shadow-md tracking-wide">
            Sneakers 2024 Limited Edition
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:shadow-xl shadow-md border border-white/20"
          >
            Shop Now
          </button>
        </div>
      </div>
{/* Shop by Brand Section */}
<div className="max-w-7xl w-full mt-10">
  <div className="text-center mb-8">
    <h2 className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-2">
      Shop by{" "}
      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Brand
      </span>
    </h2>
    <p className="text-gray-600 text-sm max-w-2xl mx-auto">
      Explore your favorite brands
    </p>
  </div>

  {/* Centered Brand Logos */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-center justify-items-center items-center max-w-5xl mx-auto">
    {brands.map((brand) => (
      <div
        key={brand.name}
        className="cursor-pointer transform transition-all duration-700 hover:scale-110"
        onClick={() => navigate(`/products?brand=${brand.name}`)}
      >
        <div className="w-20 h-20 p-2 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300">
          <img
            src={brand.logo}
            alt={brand.name}
            className="h-12 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <p className="text-center mt-1 text-sm font-semibold text-gray-700">
          {brand.name}
        </p>
      </div>
    ))}
  </div>
</div>

      {/* Top Selling Products Section */}
      <div
        className={`max-w-6xl w-full mt-10 transition-all duration-1000 transform ${
          productsVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
        }`}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black bg-gradient-to-r from-slate-800 via-gray-700 to-zinc-800 bg-clip-text text-transparent mb-2">
            Top{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Selling Products
            </span>
          </h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Our most popular sneakers loved by customers
          </p>
        </div>

        {loadingTopProducts ? (
          <p className="text-center text-sm text-gray-500">Loading top-selling products...</p>
        ) : topProducts.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No top-selling products found.</p>
        ) : (
          <div className="relative min-h-[400px] bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-2xl overflow-hidden shadow-xl border border-white/10">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 p-6 h-full items-center">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`transform transition-all duration-700 hover:scale-105 animate-productFloat${
                    index + 1
                  } group cursor-pointer`}
                  style={{
                    animationDelay: `${index * 0.3}s`,
                    animationFillMode: "both",
                  }}
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <div className="relative bg-white/10 rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/15 transition-all duration-500 overflow-hidden">
                    <div className="relative mb-4">
                      <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 animate-productBob border-2 border-white/20">
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect fill="%23f3f4f6" width="96" height="96"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="10"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-center text-white">
                      <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                      <p className="text-white/70 text-xs mb-2">
                        {product.brand || product.category}
                      </p>
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                          ₹{product.price}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/products/${product.id}`);
                        }}
                        className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
