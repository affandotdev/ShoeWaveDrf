
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const [orderId, setOrderId] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const savedOrder = JSON.parse(localStorage.getItem("lastOrder"));
    if (savedOrder?.id) {
      setOrderId(savedOrder.id);
    }


    setShowConfetti(true);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/order");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 relative overflow-hidden">
   
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-green-200 to-emerald-200 opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}

    
        {showConfetti && (
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#10b981', '#059669', '#34d399', '#6ee7b7', '#a7f3d0'][Math.floor(Math.random() * 5)],
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
      
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto relative">
           
            <div className="absolute inset-0 border-8 border-green-200 rounded-full animate-ping"></div>
            <div className="absolute inset-2 border-6 border-green-300 rounded-full animate-pulse"></div>
            
         
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-bounce-in shadow-2xl">
              <svg 
                className="w-16 h-16 text-white animate-check-draw" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ animationDelay: '0.5s' }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  d="M5 13l4 4L19 7"
                  className="check-path"
                ></path>
              </svg>
            </div>

            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-sparkle"
                style={{
                  top: `${25 + Math.cos(i * Math.PI / 4) * 60}px`,
                  left: `${25 + Math.sin(i * Math.PI / 4) * 60}px`,
                  animationDelay: `${0.5 + i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        </div>

      
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6 animate-text-shimmer">
            🎉 Order Placed Successfully!
          </h1>
          
          <p className="text-xl text-gray-700 mb-4 animate-fade-in" style={{ animationDelay: '1s' }}>
            Thank you for your amazing purchase!
          </p>

          {orderId && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-100 animate-scale-in" style={{ animationDelay: '1.2s' }}>
              <p className="text-lg text-gray-600 mb-2">Your Order ID:</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span className="font-mono font-bold text-green-800 text-lg tracking-wider">{orderId}</span>
              </div>
            </div>
          )}

       
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-100 animate-scale-in" style={{ animationDelay: '1.4s' }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg className="w-6 h-6 text-green-600 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-lg text-gray-700">
                Redirecting to your orders in
              </p>
            </div>
            <div className="text-4xl font-bold text-green-600 animate-pulse">
              {countdown}
            </div>
          
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '1.6s' }}>
            <Link
              to="/order"
              className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-8 rounded-2xl text-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                View Orders
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>

            <Link
              to="/"
              className="group relative overflow-hidden bg-white text-green-600 font-bold py-4 px-8 rounded-2xl text-lg border-2 border-green-600 hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h8.5m-10.5-8h10"></path>
                </svg>
                Continue Shopping
              </span>
            </Link>
          </div>

      
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '2s' }}>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-green-100">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <p className="text-sm text-gray-600">Order confirmation sent to your email</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-green-100">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
              </div>
              <p className="text-sm text-gray-600">Track your package in real-time</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-green-100">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <p className="text-sm text-gray-600">Thank you for choosing us!</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes sparkle {
          0%, 100% { 
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% { 
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes check-draw {
          0% {
            stroke-dasharray: 0 50;
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 50 50;
            stroke-dashoffset: 0;
          }
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-ping { animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; opacity: 0; }
        .animate-scale-in { animation: scale-in 0.5s ease-out forwards; opacity: 0; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
        .animate-text-shimmer { 
          background-size: 200% auto;
          animation: text-shimmer 3s linear infinite;
        }
        .animate-float { animation: float ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 1.5s ease-in-out infinite; }
        .animate-check-draw { 
          animation: check-draw 0.5s ease-out forwards;
          stroke-dasharray: 0 50;
        }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }

        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall linear infinite;
        }

        .confetti-container {
          position: absolute;
          top: -50px;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessPage;