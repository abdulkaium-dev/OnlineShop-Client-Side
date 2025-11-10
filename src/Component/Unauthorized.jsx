import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#FFFFFF] transition-colors">
      <div className="bg-[#FFFFFF] border border-gray-200 rounded-2xl shadow-lg p-10 md:p-16 max-w-lg text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] mb-4 drop-shadow-sm">
          Unauthorized Access
        </h2>

        {/* Message */}
        <p className="text-[#111111]/80 text-lg md:text-xl mb-8">
          You don’t have permission to view this page.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block bg-[#FF6B6B] hover:bg-[#FFD93D] hover:text-[#111111] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
          aria-label="Go back to homepage"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
