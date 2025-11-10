import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Exclusive Deals & Discounts",
    description: "Get up to 50% off on selected products — limited time only!",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=crop&w=2560&h=1440",
    gradient: "from-yellow-400 via-orange-400 to-red-400",
  },
  {
    title: "Upgrade Your Lifestyle Today",
    description:
      "From fashion to gadgets — find everything that fits your style.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=crop&w=2560&h=1440",
    gradient: "from-purple-600 via-pink-500 to-rose-400",
  },
  {
    title: "Smart Gadgets & Accessories",
    description:
      "Find the latest tech gadgets to simplify your life and boost productivity.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=crop&w=2560&h=1440",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
  },
];

const Slider = () => {
  return (
    <div className="relative w-full h-[80vh] sm:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="fade"
        loop={true}
        slidesPerView={1}
        className="w-full h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="relative w-full h-full flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${slide.gradient} opacity-50`}
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Floating shapes */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>

              {/* Content */}
              <div className="relative z-20 text-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 text-white">
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg animate-fadeInUp">
                  {slide.title}
                </h2>
                <p className="mt-4 text-sm sm:text-lg md:text-xl drop-shadow-md animate-fadeInUp delay-200">
                  {slide.description}
                </p>

                {/* Search Box */}
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mt-6 flex w-full max-w-xs sm:max-w-md md:max-w-lg rounded-lg overflow-hidden bg-white/30 backdrop-blur-md shadow-lg border border-white/30 mx-auto animate-fadeInUp delay-400"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-grow px-4 py-2 sm:py-3 text-gray-900 placeholder-gray-500 bg-transparent outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 sm:px-6 py-2 font-medium transition"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
