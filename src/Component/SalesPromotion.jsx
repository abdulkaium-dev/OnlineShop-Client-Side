import React from "react";

const SalesPromotion = () => {
  const productImages = [
    "https://i.ibb.co.com/S73NCJzL/download.jpg",
    "https://i.ibb.co.com/CCxtGTq/images.jpg",
    "https://i.ibb.co.com/0jQhd0yC/images-1.jpg",
  ];

  return (
    <section className="relative w-full h-[80vh] lg:h-[90vh] overflow-hidden rounded-3xl shadow-2xl">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-90"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/PG65LFDL/Introduction-About-E-Store-Management-Admin-Services.webp')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Floating Shapes */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-floatSlow"></div>
      <div className="absolute -bottom-20 -right-16 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-floatReverse"></div>

      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 animate-fadeInUp delay-100">
          Mega Sale is Here!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 animate-fadeInUp delay-300 max-w-2xl">
          Up to <span className="font-bold underline decoration-yellow-400">50% OFF</span> on electronics, fashion, and lifestyle products. Limited time only!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-500">
          <button className="bg-white/20 backdrop-blur-lg text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-white/40 hover:scale-105 transition transform duration-300">
            Shop Now
          </button>
          <button className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-300 hover:scale-105 transition transform duration-300">
            Explore Deals
          </button>
        </div>
      </div>

      {/* Floating Product Cards */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-6 z-30">
        {productImages.map((img, idx) => (
          <div
            key={idx}
            className="relative w-40 h-40 bg-white/90 dark:bg-gray-800/80 rounded-3xl shadow-xl hover:scale-110 transition-transform duration-500 cursor-pointer"
          >
            <img
              src={img}
              alt={`Product ${idx + 1}`}
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute top-2 left-2 bg-pink-500 text-white font-bold px-2 py-1 rounded-full text-xs shadow-md animate-bounce">
              {30 + idx * 10}% OFF
            </div>
          </div>
        ))}
      </div>

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-floatSlow {
          animation: floatSlow 10s ease-in-out infinite;
        }

        @keyframes floatReverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-floatReverse {
          animation: floatReverse 12s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default SalesPromotion;
