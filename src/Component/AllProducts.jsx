import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../Api/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthContext";

const AllProducts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("likes");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `/all-products?sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`
      );
      setProducts(response.data.products);
      setTotal(response.data.total);
    } catch (err) {
      setError("Failed to load products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [sortBy, order, page]);

  const handleDelete = async (productId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6B6B",
      cancelButtonColor: "#FFD93D",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosInstance.delete(`/products/${productId}`, {
        headers: { "x-admin-email": user?.email || "" },
      });
      if (res.data.success) {
        Swal.fire("Deleted!", "The product has been deleted.", "success");
        fetchProducts();
      } else {
        Swal.fire("Error", res.data.message || "Deletion failed", "error");
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Failed to delete product.",
        "error"
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8 bg-[#FFFFFF] rounded-2xl shadow-xl mt-10 border border-gray-200 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-[#111111] text-center mb-8">
        All Products
      </h2>

      {/* Sorting Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 text-[#111111] font-semibold">
        <label className="flex items-center space-x-2">
          <span>Sort by:</span>
          <select
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#FFD93D] bg-[#FFFFFF] text-[#111111] transition"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="likes">Likes</option>
            <option value="reviewCount">Reviews Count</option>
            <option value="rating">Rating</option>
          </select>
        </label>

        <label className="flex items-center space-x-2">
          <span>Order:</span>
          <select
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#FFD93D] bg-[#FFFFFF] text-[#111111] transition"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>

      {loading && (
        <p className="text-center text-[#111111]/70 py-8">Loading products...</p>
      )}
      {error && (
        <p className="text-center text-[#FF6B6B] py-8 font-semibold">{error}</p>
      )}
      {!loading && products.length === 0 && (
        <p className="text-center italic text-[#111111]/70 py-8">
          No products found.
        </p>
      )}

      {/* Table View (Desktop) */}
      {!loading && products.length > 0 && (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg shadow border border-gray-200 bg-[#FFFFFF]">
            <table className="w-full min-w-[700px] table-auto border-collapse">
              <thead>
                <tr className="bg-[#FF6B6B] text-white select-none">
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-center">Likes</th>
                  <th className="px-4 py-3 text-center">Reviews</th>
                  <th className="px-4 py-3 text-center">Rating</th>
                  <th className="px-4 py-3 text-left">Distributor</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr
                    key={product._id}
                    className={
                      i % 2 === 0
                        ? "bg-[#FFFFFF] hover:bg-[#FFD93D]/10 transition"
                        : "bg-[#FFF7E1] hover:bg-[#FFD93D]/10 transition"
                    }
                  >
                    <td className="px-4 py-3 text-[#111111] font-medium">
                      {product.title}
                    </td>
                    <td className="px-4 py-3 text-center text-[#111111]">
                      {product.likes}
                    </td>
                    <td className="px-4 py-3 text-center text-[#111111]">
                      {product.reviewCount}
                    </td>
                    <td className="px-4 py-3 text-center text-[#111111]">
                      {product.rating?.toFixed(1) ?? "N/A"}
                    </td>
                    <td className="px-4 py-3 text-[#111111]">
                      {product.distributorName || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/products/update/${product._id}`)
                        }
                        className="bg-[#FF6B6B] hover:bg-[#FFD93D] hover:text-[#111111] text-white px-3 py-1 rounded-md text-xs sm:text-sm font-semibold transition-all duration-300"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="bg-[#FFD93D] hover:bg-[#FF6B6B] hover:text-white text-[#111111] px-3 py-1 rounded-md text-xs sm:text-sm font-semibold transition-all duration-300"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="border-2 border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B]/10 px-3 py-1 rounded-md text-xs sm:text-sm font-semibold transition-all duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-[#FFFFFF] rounded-xl shadow-lg border border-gray-200 p-4"
              >
                <h3 className="text-lg font-semibold text-[#111111] mb-2">
                  {product.title}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-[#111111]/80 mb-3">
                  <div>
                    <span className="font-semibold text-[#111111]">Likes:</span>{" "}
                    {product.likes}
                  </div>
                  <div>
                    <span className="font-semibold text-[#111111]">
                      Reviews:
                    </span>{" "}
                    {product.reviewCount}
                  </div>
                  <div>
                    <span className="font-semibold text-[#111111]">
                      Rating:
                    </span>{" "}
                    {product.rating?.toFixed(1) ?? "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#111111]">
                      Distributor:
                    </span>{" "}
                    {product.distributorName || "N/A"}
                  </div>
                </div>
                <div className="flex justify-between space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/products/update/${product._id}`)
                    }
                    className="flex-1 bg-[#FF6B6B] hover:bg-[#FFD93D] hover:text-[#111111] text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="flex-1 bg-[#FFD93D] hover:bg-[#FF6B6B] hover:text-white text-[#111111] px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 border-2 border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B]/10 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all duration-300 ${
            page === 1
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FFD93D]/20"
          }`}
        >
          Prev
        </button>
        <span className="font-semibold text-[#111111]">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
          className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all duration-300 ${
            page >= totalPages
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FFD93D]/20"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
