import React from "react";
import { FaStar } from "react-icons/fa";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Alice Thompson",
    role: "E-commerce Manager",
    review:
      "Streamlined my online store workflow. Managing products and inventory is a breeze now!",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "John Williams",
    role: "Store Owner",
    review:
      "The analytics dashboard helped optimize sales and inventory. A game-changer for small businesses!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "Business Analyst",
    review:
      "Secure payments, real-time updates, and intuitive interface. Everything an online store needs!",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
    rating: 5,
  },
];

const StarRating = ({ value }) => {
  const full = Math.floor(value);
  const half = value % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex gap-1">
      {Array(full).fill().map((_, i) => <FaStar key={`f${i}`} className="text-yellow-400" />)}
      {half === 1 && <FaStar className="text-yellow-400" style={{ clipPath: "inset(0 50% 0 0)" }} />}
      {Array(empty).fill().map((_, i) => <FaStar key={`e${i}`} className="text-gray-300" />)}
    </div>
  );
};

const CustomerReviews = () => {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-900 py-24 px-6 sm:px-12 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Trusted by e-commerce professionals worldwide. See how our platform transforms online stores.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.id}
            className={`relative flex flex-col p-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer
              ${i === 0 ? "-translate-y-6 md:-translate-y-12" : i === 2 ? "translate-y-6 md:translate-y-12" : ""}`}
          >
            {/* Floating Badge */}
            <div className="absolute -top-6 right-6 bg-blue-500 text-white px-3 py-1 rounded-full font-semibold text-sm shadow-lg animate-bounce">
              Top Rated
            </div>

            {/* Avatar */}
            <img
              src={t.image}
              alt={t.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-blue-500 shadow-lg mb-4"
            />

            {/* Name & Role */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">{t.role}</p>

            {/* Review */}
            <p className="text-gray-700 dark:text-gray-200 mb-4 flex-grow">{t.review}</p>

            {/* Rating */}
            <StarRating value={t.rating} />
          </div>
        ))}
      </div>

      {/* Decorative floating shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-tr from-blue-400 to-cyan-300 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default CustomerReviews;
