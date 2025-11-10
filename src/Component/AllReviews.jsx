import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://online-shop-server-side.vercel.app",
});

const AllReviews = () => {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchAllReviews = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/all-reviews?page=${page}&limit=${limit}`);
      const data = res.data;
      setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching all reviews:", error);
      Swal.fire("Error", "Failed to load reviews", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews(currentPage);
  }, [currentPage]);

  const handleDelete = async (reviewId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6B6B",
      cancelButtonColor: "#FFD93D",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/reviews/${reviewId}`);
        Swal.fire("Deleted!", "Review has been deleted.", "success");
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      } catch (error) {
        console.error("Delete review error:", error);
        Swal.fire("Error", "Failed to delete review.", "error");
      }
    }
  };

  if (loading)
    return (
      <p className="text-center text-[#111111] py-8 text-lg">Loading reviews...</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 bg-[#FFFFFF] rounded-xl shadow-lg mt-10 transition-colors duration-300">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#111111] text-center sm:text-left">
        All Reviews
      </h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-[#FFFFFF] shadow-sm">
        <table className="min-w-[700px] w-full table-auto border-collapse">
          <thead className="bg-[#FF6B6B] text-white">
            <tr>
              <th className="p-3 text-left text-sm sm:text-base whitespace-nowrap">
                Product Title
              </th>
              <th className="p-3 text-center text-sm sm:text-base whitespace-nowrap">
                Likes
              </th>
              <th className="p-3 text-left text-sm sm:text-base">Review Text</th>
              <th className="p-3 text-center text-sm sm:text-base whitespace-nowrap">
                Review Count
              </th>
              <th className="p-3 text-center text-sm sm:text-base whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review, i) => (
                <tr
                  key={review._id}
                  className={`hover:bg-[#FFD93D]/20 transition-colors duration-150 ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3 text-sm sm:text-base text-[#111111] font-medium">
                    {review.productTitle}
                  </td>
                  <td className="p-3 text-center text-sm sm:text-base text-[#111111]">
                    {review.productLikes ?? 0}
                  </td>
                  <td className="p-3 text-sm sm:text-base text-[#111111]">
                    {review.comment || "No review text"}
                  </td>
                  <td className="p-3 text-center text-sm sm:text-base text-[#111111]">
                    {review.productReviewCount ?? 0}
                  </td>
                  <td className="p-3 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="bg-[#FF6B6B] hover:bg-[#e45d5d] text-white px-3 py-1 rounded text-xs sm:text-sm w-full sm:w-auto transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/product/${review.productId}`)}
                      className="bg-[#FFD93D] hover:bg-[#ffcb00] text-[#111111] px-3 py-1 rounded text-xs sm:text-sm w-full sm:w-auto font-semibold transition"
                    >
                      View Product
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-6 text-[#111111] italic"
                >
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#FF6B6B] text-white hover:bg-[#e45d5d]"
          }`}
        >
          Prev
        </button>
        <span className="text-[#111111] font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#FF6B6B] text-white hover:bg-[#e45d5d]"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllReviews;
