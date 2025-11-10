import React from "react";

const features = [
  {
    icon: "🛒",
    title: "Smart Product Management",
    description:
      "Effortlessly add, update, or remove products with an intuitive dashboard.",
    color: "bg-blue-500/20 text-blue-600",
  },
  {
    icon: "📊",
    title: "Advanced Analytics",
    description:
      "Get real-time insights into sales, inventory, and customer behavior.",
    color: "bg-green-500/20 text-green-600",
  },
  {
    icon: "🔒",
    title: "Secure Transactions",
    description:
      "All payments are encrypted and processed safely for peace of mind.",
    color: "bg-purple-500/20 text-purple-600",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative bg-gray-100 dark:bg-gray-900 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-16">
          Transform Your Online Store
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map(({ icon, title, description, color }, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 transition-all duration-500 cursor-pointer"
            >
              {/* Icon */}
              <div
                className={`w-20 h-20 flex items-center justify-center rounded-full ${color} text-4xl mb-6 animate-bounce-slow`}
              >
                {icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed max-w-xs">
                {description}
              </p>

              {/* Decorative Circles */}
              <div className="absolute -top-8 -left-6 w-16 h-16 bg-gradient-to-tr from-indigo-400 to-cyan-300 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-8 -right-6 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
