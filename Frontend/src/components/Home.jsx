import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apicall/axios";

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
    <section className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 min-h-screen flex flex-col items-center justify-center px-4 py-8">

      {/* Hero Video Section */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl">
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

        <div className="relative z-20 text-center px-4 transform transition-all duration-1000 hover:scale-105">
          <h1 className="text-6xl sm:text-8xl font-black text-white leading-none drop-shadow-2xl animate-productBob bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
            shoe
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Wave
            </span>
          </h1>
          <p className="text-xl text-white/90 mt-6 font-medium drop-shadow-lg tracking-wide">
            Sneakers 2024 Limited Edition
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg border border-white/20"
          >
            Shop Now
          </button>
        </div>
      </div>
{/* Shop by Brand Section */}
<div className="max-w-7xl w-full mt-20">
  <div className="text-center mb-16">
    <h2 className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4">
      Shop by{" "}
      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Brand
      </span>
    </h2>
    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
      Explore your favorite brands
    </p>
  </div>

  {/* Centered Brand Logos */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 justify-center justify-items-center items-center max-w-5xl mx-auto">
    {brands.map((brand) => (
      <div
        key={brand.name}
        className="cursor-pointer transform transition-all duration-700 hover:scale-110"
        onClick={() => navigate(`/products?brand=${brand.name}`)}
      >
        <div className="w-32 h-32 p-4 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:shadow-2xl transition-all duration-300">
          <img
            src={brand.logo}
            alt={brand.name}
            className="h-16 object-contain"
          />
        </div>
        <p className="text-center mt-2 font-semibold text-gray-700">
          {brand.name}
        </p>
      </div>
    ))}
  </div>
</div>

      {/* Top Selling Products Section */}
      <div
        className={`max-w-6xl w-full mt-20 transition-all duration-1000 transform ${
          productsVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black bg-gradient-to-r from-slate-800 via-gray-700 to-zinc-800 bg-clip-text text-transparent mb-4">
            Top{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Selling Products
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our most popular sneakers loved by customers
          </p>
        </div>

        {loadingTopProducts ? (
          <p className="text-center text-gray-500">Loading top-selling products...</p>
        ) : topProducts.length === 0 ? (
          <p className="text-center text-gray-500">No top-selling products found.</p>
        ) : (
          <div className="relative min-h-[600px] bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-12 h-full items-center">
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
                  <div className="relative bg-white/10 rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500 overflow-hidden">
                    <div className="relative mb-8">
                      <div className="w-36 h-36 mx-auto rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-110 hover:-translate-y-3 animate-productBob border-4 border-white/20">
                        <img
                          src={
                            product.image?.startsWith("http")
                              ? product.image
                              : `http://127.0.0.1:8000${product.image}`
                          }
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          onError={(e) => {
                            e.target.src = "/images/placeholder.jpg";
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                      <p className="text-white/70 text-sm mb-4">
                        {product.brand || product.category}
                      </p>
                      <div className="flex items-center justify-center space-x-3 mb-6">
                        <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                          ₹{product.price}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/products/${product.id}`);
                        }}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
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
