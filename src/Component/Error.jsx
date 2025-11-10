import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({
  title = "Oops! Page Not Found",
  message = "The page you are looking for does not exist or an error occurred.",
  showHomeButton = true,
  errorCode = "404",
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFFFF] px-6 transition-colors duration-300">
      {/* Error Code */}
      <div className="text-[#FF6B6B] text-9xl font-extrabold mb-8 select-none animate-pulse drop-shadow-lg">
        {errorCode}
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#111111] mb-4 text-center drop-shadow-sm">
        {title}
      </h1>

      {/* Message */}
      <p className="max-w-xl text-center text-[#111111]/80 text-lg mb-10 px-4 leading-relaxed">
        {message}
      </p>

      {/* Buttons */}
      {showHomeButton && (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Primary Button */}
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-[#FF6B6B] text-[#FFFFFF] font-semibold rounded-lg shadow-md 
                       hover:bg-[#FFD93D] hover:text-[#111111] transition duration-300 
                       ease-in-out transform hover:-translate-y-1 focus:outline-none 
                       focus:ring-2 focus:ring-[#FFD93D]/50"
          >
            Go to Home
          </button>

          {/* Secondary Button */}
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 border-2 border-[#FF6B6B] text-[#FF6B6B] font-semibold rounded-lg 
                       shadow-md hover:bg-[#FF6B6B] hover:text-[#FFFFFF] transition 
                       duration-300 ease-in-out transform hover:scale-105 focus:outline-none 
                       focus:ring-2 focus:ring-[#FFD93D]/50"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorPage;
