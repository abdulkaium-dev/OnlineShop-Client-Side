import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaChartLine } from "react-icons/fa";

const Promotion = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-800 dark:to-cyan-700 text-white py-16 px-6 sm:px-12 lg:px-20 rounded-3xl overflow-hidden shadow-xl max-w-7xl mx-auto transition-colors duration-300"
    >
      {/* Decorative Floating Circles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 dark:bg-white/20 rounded-full -translate-x-12 -translate-y-12 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 dark:bg-white/20 rounded-full translate-x-12 translate-y-12 pointer-events-none animate-pulse"></div>

      <div
        className={`flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10 transition-transform duration-1000 ${
          visible ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0"
        }`}
      >
        {/* Text Content */}
        <div className="w-full lg:max-w-xl text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg flex items-center gap-3">
            <FaRocket className="text-yellow-400" /> Boost Your Online Shop!
          </h2>
          <p className="text-white/90 dark:text-white/80 text-base sm:text-lg lg:text-xl mb-6 leading-relaxed">
            Launch your online store in minutes, manage products efficiently, and skyrocket sales with our all-in-one management platform.
          </p>
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 dark:text-indigo-900 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition transform hover:-translate-y-1 text-base sm:text-lg"
          >
            <FaChartLine /> Get Started
          </Link>
        </div>

        {/* Illustration / Image */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-md rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center animate-slide-float">
            <img
              src="https://images.unsplash.com/photo-1605902711622-cfb43c443e7a?auto=format&fit=crop&w=600&q=80"
              alt="Online Shop Dashboard"
              className="w-full h-64 md:h-72 object-cover rounded-2xl shadow-lg border-2 border-white/20 dark:border-white/10 animate-float"
            />
            <p className="mt-4 text-white/90 dark:text-white/80 text-center text-sm sm:text-base">
              Intuitive dashboards & real-time analytics for smarter decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          @keyframes slideFloat {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-float {
            animation: slideFloat 1s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
};

export default Promotion;
