import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [productsVisible, setProductsVisible] = useState(false);
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const navigate = useNavigate();

  const products = [
    {
      id: "1",
      name: "Adidas Samba",
      price: "$125",
      originalPrice: "$219.99",
      color: "Electric Blue",
      image: "/images/add 2.jpeg",
      features: ["Lightweight", "Breathable", "Durable"]
    },
    {
      id: 2,
      name: "Ultraboost 5",
      price: "$180",
      originalPrice: "$249.99",
      color: "Sunset Orange",
      image: "/images/product 2.jpeg",
      features: ["Energy Return", "Cushioned", "Flexible"]
    },
    {
      id: 3,
      name: "Simone",
      price: "$39.95",
      originalPrice: "$199.99",
      color: "Forest Green",
      image: "/images/product 11.jpeg",
      features: ["Street Style", "Comfortable", "Versatile"]
    }
  ];

  const categories = [
    {
      id: 1,
      name: "Running Shoes",
      description: "Built for speed and comfort",
      icon: "🏃‍♂️",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      hoverGradient: "from-emerald-500 via-teal-600 to-cyan-700"
    },
    {
      id: 2,
      name: "Casual Sneakers",
      description: "Style meets everyday comfort",
      icon: "👟",
      gradient: "from-violet-400 via-purple-500 to-indigo-600",
      hoverGradient: "from-violet-500 via-purple-600 to-indigo-700"
    },
      {
      id: 3,
      name: "Formal Shoes",
      description: "Professional elegance for every occasion",
      icon: "👔",
      gradient: "from-gray-600 via-slate-700 to-zinc-800",
      hoverGradient: "from-gray-700 via-slate-800 to-zinc-900"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const categoriesTimer = setTimeout(() => setCategoriesVisible(true), 800);
    const productsTimer = setTimeout(() => setProductsVisible(true), 1500);
    return () => {
      clearTimeout(timer);
      clearTimeout(categoriesTimer);
      clearTimeout(productsTimer);
    };
  }, []);

  const handleVideoLoad = () => setVideoLoaded(true);

  return (
    <section className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 min-h-screen flex flex-col items-center justify-center px-4 py-8">
     
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl">
     
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ${videoLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          poster="/images/product 1.jpeg"
        >
          <source
            src="/images/Nike Air Max 270 - Animation - Trim.mp4"
            type="video/mp4"
          />
          <source
            src="/path-to-your-shoe-animation.webm"
            type="video/webm"
          />
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
            shoe<span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Wave</span>
          </h1>
          <p className="text-xl text-white/90 mt-6 font-medium drop-shadow-lg tracking-wide">
            Sneakers 2024 Limited Edition
          </p>
          <button
            onClick={() => navigate('/products')}
            className="mt-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg border border-white/20"
          >
            Shop Now
          </button>
        </div>
      </div>

      
      <div
        className={`max-w-7xl w-full mt-20 transition-all duration-1000 transform ${categoriesVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
          }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black bg-gradient-to-r from-slate-800 via-gray-700 to-zinc-800 bg-clip-text text-transparent mb-4">
            Shop by <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover your perfect pair from our curated collection of premium footwear
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 opacity-0 animate-slideUp`}
              style={{
                animationDelay: `${800 + index * 150}ms`,
                animationFillMode: "forwards"
              }}
            >
              <div className={`h-64 bg-gradient-to-br ${category.gradient} group-hover:bg-gradient-to-br group-hover:${category.hoverGradient} transition-all duration-500 relative overflow-hidden`}>
               
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                
                <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-center">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm group-hover:text-white/70 transition-colors">
                    {category.description}
                  </p>
                  
            
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-3xl"></div>
                </div>
              </div>
              
           
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>
      </div>

     
      <div
        className={`max-w-6xl w-full mt-20 transition-all duration-1000 transform ${productsVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
          }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black bg-gradient-to-r from-slate-800 via-gray-700 to-zinc-800 bg-clip-text text-transparent mb-4">
            Featured <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Limited edition sneakers crafted with precision and style
          </p>
        </div>

        <div className="relative min-h-[600px] bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
       
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-12 h-full items-center">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`transform transition-all duration-700 hover:scale-105 animate-productFloat${index + 1} group cursor-pointer`}
                style={{
                  animationDelay: `${index * 0.3}s`,
                  animationFillMode: "both"
                }}
              >
                <div className="relative bg-white/10 rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500 overflow-hidden">
                  
                

  
                  <div className="relative mb-8">
                    <div className="w-36 h-36 mx-auto rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transform transition-all duration-500 hover:scale-110 hover:-translate-y-3 animate-productBob border-4 border-white/20 group-hover:border-white/40">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-300 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 font-medium">
                      {product.color}
                    </p>
                    <div className="flex items-center justify-center space-x-3 mb-6">
                      <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        {product.price}
                      </span>
                      <span className="text-sm text-white/50 line-through">
                        {product.originalPrice}
                      </span>
                    </div>

                 
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white/20 text-white px-3 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

            
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            {
              icon: "⚡",
              title: "Fast Delivery",
              desc: "Get your shoes delivered in 24 hours",
              gradient: "from-yellow-400 to-orange-500",
              bgGradient: "from-yellow-50 to-orange-50"
            },
            {
              icon: "🛡️",
              title: "Quality Guarantee",
              desc: "Premium materials and craftsmanship",
              gradient: "from-blue-400 to-indigo-500",
              bgGradient: "from-blue-50 to-indigo-50"
            },
            {
              icon: "🔄",
              title: "Easy Returns",
              desc: "30-day hassle-free return policy",
              gradient: "from-green-400 to-emerald-500",
              bgGradient: "from-green-50 to-emerald-50"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 opacity-0 animate-slideUp cursor-pointer overflow-hidden border border-gray-100`}
              style={{
                animationDelay: `${2000 + index * 200}ms`,
                animationFillMode: "forwards"
              }}
            >
              
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`text-5xl mb-6 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 inline-block p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-10`}>
                  {feature.icon}
                </div>
                <h3 className={`text-2xl font-bold text-gray-800 mb-4 group-hover:bg-gradient-to-r group-hover:${feature.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

            
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>
      </div>

      
      <style jsx>{`
        @keyframes productFloat1 {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.8) rotateY(10deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateY(0deg);
          }
        }
        @keyframes productFloat2 {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.8) rotateY(-10deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateY(0deg);
          }
        }
        @keyframes productFloat3 {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.8) rotateY(10deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateY(0deg);
          }
        }
        @keyframes productBob {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(3deg);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-productFloat1 {
          animation: productFloat1 1s ease-out;
        }
        .animate-productFloat2 {
          animation: productFloat2 1.2s ease-out;
        }
        .animate-productFloat3 {
          animation: productFloat3 1.4s ease-out;
        }
        .animate-productBob {
          animation: productBob 4s ease-in-out infinite;
        }
        .animate-slideUp {
          animation: slideUp 1s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default Home;