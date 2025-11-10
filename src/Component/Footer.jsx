import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#4F46E5] dark:bg-gray-900 text-white dark:text-gray-100 py-10 sm:py-14 px-6 sm:px-12 lg:px-20 relative overflow-hidden shadow-inner">
      {/* Floating Circles for Depth Effect */}
      <div className="absolute -top-24 -left-20 w-56 h-56 sm:w-72 sm:h-72 bg-cyan-400/20 rounded-full blur-3xl animate-slow-spin pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-500/20 rounded-full blur-3xl animate-slow-spin-reverse pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {/* Column 1 — Logo & About */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <img
              src="https://i.ibb.co.com/b5tzGmCp/ShopEase.png"
              onError={(e) => (e.target.src = "/default-logo.png")}
              alt="ShopEase Logo"
              className="w-10 h-10 rounded-lg object-contain border-2 border-cyan-400"
            />
            <h2 className="text-2xl font-bold tracking-wide">ShopEase</h2>
          </Link>
          <p className="max-w-sm text-sm opacity-90 leading-relaxed">
            ShopEase is your trusted online marketplace for smart, secure, and seamless shopping.
            Discover top products at unbeatable prices — all in one place!
          </p>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 border-b-2 border-cyan-400 dark:border-cyan-500 pb-1 inline-block">
            Quick Links
          </h3>
          <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
            {[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Upcoming Products", href: "/upcoming-products" },
              { name: "Newsletter", href: "/newsletter" },
              { name: "Join Us", href: "/join-us" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="hover:text-cyan-300 dark:hover:text-cyan-400 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact & Social */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 border-b-2 border-cyan-400 dark:border-cyan-500 pb-1 inline-block">
            Get in Touch
          </h3>
          <p className="opacity-90 mb-1 text-sm sm:text-base">
            123 Market Street, Dhaka, Bangladesh
          </p>
          <p className="opacity-90 mb-1 text-sm sm:text-base">
            Email: support@shopease.com
          </p>
          <p className="opacity-90 mb-3 text-sm sm:text-base">
            Phone: +880 1700 123 456
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4 mt-2">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 sm:p-3 rounded-full bg-cyan-400 text-[#1E293B] hover:bg-white hover:text-[#4F46E5] shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Icon className="text-sm sm:text-base" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-cyan-400/30 dark:border-cyan-600/30 my-6 sm:my-8" />

      {/* Copyright */}
      <p className="text-center text-xs sm:text-sm opacity-70 select-none">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </p>

      {/* Animations */}
      <style>{`
        @keyframes slow-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slow-spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 60s linear infinite;
        }
        .animate-slow-spin-reverse {
          animation: slow-spin-reverse 80s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
