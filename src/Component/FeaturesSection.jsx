import React from "react";

const features = [
  {
    icon: "🛒",
    title: "Smart Product Management",
    description:
      "Effortlessly add, update, or remove products with an intuitive dashboard.",
    color: "bg-[#FF6B6B]/20 text-[#FF6B6B]", // Primary Accent
  },
  {
    icon: "📊",
    title: "Advanced Analytics",
    description:
      "Get real-time insights into sales, inventory, and customer behavior.",
    color: "bg-[#FFD93D]/20 text-[#FFD93D]", // Secondary Accent
  },
  {
    icon: "🔒",
    title: "Secure Transactions",
    description:
      "All payments are encrypted and processed safely for peace of mind.",
    color: "bg-[#FF6B6B]/20 text-[#FF6B6B]", // Primary Accent
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative bg-[#FFFFFF] dark:bg-[#111111] py-20 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111111] dark:text-[#FFFFFF] mb-16">
          Transform Your Online Store
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map(({ icon, title, description, color }, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center bg-[#FFFFFF]/40 dark:bg-[#111111]/40 backdrop-blur-md border border-[#FFFFFF]/30 dark:border-[#111111]/30 rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 transition-all duration-500 cursor-pointer"
            >
              {/* Icon */}
              <div
                className={`w-20 h-20 flex items-center justify-center rounded-full ${color} text-4xl mb-6 animate-bounce-slow`}
              >
                {icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[#111111] dark:text-[#FFFFFF] mb-3">
                {title}
              </h3>

              {/* Description */}
              <p className="text-[#111111]/70 dark:text-[#FFFFFF]/70 text-base leading-relaxed max-w-xs">
                {description}
              </p>

              {/* Decorative Circles */}
              <div className="absolute -top-8 -left-6 w-16 h-16 bg-gradient-to-tr from-[#FF6B6B] to-[#FFD93D] rounded-full opacity-20 blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-8 -right-6 w-20 h-20 bg-gradient-to-br from-[#FFD93D] to-[#FF6B6B] rounded-full opacity-20 blur-3xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind Animation */}
      <style jsx>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;
