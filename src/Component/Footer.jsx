import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-[#FFFFFF] py-10 sm:py-14 px-6 sm:px-12 lg:px-20 relative overflow-hidden shadow-inner">
      {/* Floating Accent Glows */}
      <div className="absolute -top-24 -left-20 w-56 h-56 sm:w-72 sm:h-72 bg-[#FF6B6B]/20 rounded-full blur-3xl animate-slow-spin pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 sm:w-80 sm:h-80 bg-[#FFD93D]/20 rounded-full blur-3xl animate-slow-spin-reverse pointer-events-none"></div>

      {/* Main Grid */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        
        {/* Column 1 — Logo & About */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <img
              src="https://i.ibb.co.com/b5tzGmCp/ShopEase.png"
              onError={(e) => (e.target.src = '/default-logo.png')}
              alt="ShopEase Logo"
              className="w-10 h-10 rounded-lg object-contain border-2 border-[#FFD93D]"
            />
            <h2 className="text-2xl font-bold tracking-wide text-[#FFD93D]">
              ShopEase
            </h2>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-[#FFFFFF]/80">
            ShopEase is your trusted online marketplace for smart, secure, and seamless shopping.
            Discover top products at unbeatable prices — all in one place!
          </p>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 border-b-2 border-[#FF6B6B] pb-1 inline-block">
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
                  className="hover:text-[#FFD93D] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact & Social */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 border-b-2 border-[#FF6B6B] pb-1 inline-block">
            Get in Touch
          </h3>
          <p className="mb-1 text-sm sm:text-base text-[#FFFFFF]/80">
            123 Market Street, Dhaka, Bangladesh
          </p>
          <p className="mb-1 text-sm sm:text-base text-[#FFFFFF]/80">
            Email: support@shopease.com
          </p>
          <p className="mb-3 text-sm sm:text-base text-[#FFFFFF]/80">
            Phone: +880 1700 123 456
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4 mt-2">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 sm:p-3 rounded-full bg-[#FF6B6B] text-[#111111] hover:bg-[#FFD93D] hover:text-[#111111] shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Icon className="text-sm sm:text-base" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-[#FFFFFF]/20 my-6 sm:my-8" />

      {/* Copyright */}
      <p className="text-center text-xs sm:text-sm text-[#FFFFFF]/70 select-none">
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
