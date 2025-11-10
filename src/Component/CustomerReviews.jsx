import React from "react";
import { FaStar } from "react-icons/fa";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rafi Ahmed",
    role: "E-commerce Manager",
    review:
      "Managing products, tracking inventory, and analyzing performance became effortless with this system!",
    image: "https://i.ibb.co.com/67THhgqX/Whats-App-Image-2025-11-11-at-12-46-20-AM.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Sajib khan",
    role: "Store Owner",
    review:
      "This platform helped me automate sales analytics and optimize stock — it’s a must-have for shop owners.",
    image: "https://i.ibb.co.com/vx3skmKh/Whats-App-Image-2025-11-11-at-12-46-20-AM-1.jpg",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "Business Analyst",
    review:
      "Secure transactions, smart insights, and beautiful dashboards — a complete online shop solution!",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
    rating: 5,
  },
];

const StarRating = ({ value }) => {
  const full = Math.floor(value);
  const half = value % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex gap-1 justify-center md:justify-start">
      {Array(full)
        .fill()
        .map((_, i) => (
          <FaStar key={`f${i}`} className="text-[#FFD93D]" />
        ))}
      {half === 1 && (
        <FaStar
          className="text-[#FFD93D]"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      )}
      {Array(empty)
        .fill()
        .map((_, i) => (
          <FaStar key={`e${i}`} className="text-gray-300" />
        ))}
    </div>
  );
};

const CustomerReviews = () => {
  return (
    <section className="relative bg-[#FFFFFF] dark:bg-[#111111] py-24 px-6 sm:px-12 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111111] dark:text-[#FFFFFF] mb-4">
          What Our Users Say
        </h2>
        <p className="text-[#111111]/70 dark:text-[#FFFFFF]/70 text-lg max-w-2xl mx-auto">
          Trusted by online shop owners worldwide. Discover how our system
          simplifies store management and boosts growth.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.id}
            className={`relative flex flex-col items-center md:items-start p-8 bg-[#FFFFFF] dark:bg-[#111111] backdrop-blur-md border border-[#FF6B6B]/20 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer ${
              i === 0
                ? "-translate-y-6 md:-translate-y-10"
                : i === 2
                ? "translate-y-6 md:translate-y-10"
                : ""
            }`}
          >
            {/* Floating Badge */}
            <div className="absolute -top-6 right-6 bg-[#FFD93D] text-[#111111] px-3 py-1 rounded-full font-semibold text-sm shadow-lg animate-bounce">
              Top Rated
            </div>

            {/* Avatar */}
            <img
              src={t.image}
              alt={t.name}
              className="w-20 h-20 rounded-full border-4 border-[#FF6B6B] shadow-lg mb-4 object-cover"
            />

            {/* Name & Role */}
            <h3 className="text-xl font-bold text-[#111111] dark:text-[#FFFFFF]">
              {t.name}
            </h3>
            <p className="text-sm text-[#111111]/70 dark:text-[#FFFFFF]/60 mb-4">
              {t.role}
            </p>

            {/* Review */}
            <p className="text-[#111111]/90 dark:text-[#FFFFFF]/80 mb-6 text-center md:text-left">
              {t.review}
            </p>

            {/* Rating */}
            <StarRating value={t.rating} />
          </div>
        ))}
      </div>

      {/* Decorative floating shapes */}
      <div className="absolute -top-24 -left-20 w-80 h-80 bg-[#FF6B6B]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-[#FFD93D]/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default CustomerReviews;
