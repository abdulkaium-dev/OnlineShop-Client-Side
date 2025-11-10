import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "https://online-shop-server-side.vercel.app", // your backend URL
});

const ServeProducts = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [servingId, setServingId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  // debounce helper
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchRequests = async (searchTerm, currentPage) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/serve-products", {
        params: { search: searchTerm, page: currentPage, limit },
      });
      setRequests(res.data.requests);
      setTotal(res.data.total);
    } catch (error) {
      console.error("Failed to fetch product requests:", error);
      Swal.fire("Error", "Failed to load requested products", "error");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce((searchTerm, currentPage) => fetchRequests(searchTerm, currentPage), 300),
    []
  );

  useEffect(() => {
    debouncedFetch(search, page);
  }, [search, page, debouncedFetch]);

  const handleServe = async (requestId) => {
    const confirm = await Swal.fire({
      title: "Serve this product?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FF6B6B",
      cancelButtonColor: "#FFD93D",
      confirmButtonText: "Yes, Delivery it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      setServingId(requestId);
      await axiosInstance.put(`/serve-products/${requestId}/serve`);
      Swal.fire("Success", "Product request marked as delivered.", "success");
      fetchRequests(search, page);
    } catch (error) {
      console.error("Error serving product request:", error);
      Swal.fire("Error", "Failed to update status.", "error");
    } finally {
      setServingId(null);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 rounded-xl mt-10 shadow-lg bg-[#FFFFFF] dark:bg-[#111111] transition-colors">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#111111] dark:text-[#FFFFFF] text-center sm:text-left transition-colors">
        Serve Products
      </h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by user name or email"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        className="border border-gray-300 dark:border-gray-700 p-2 mb-4 w-full sm:w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] text-[#111111] dark:text-[#FFFFFF] bg-white dark:bg-[#1A1A1A] transition-colors"
      />

      {loading ? (
        <p className="text-center text-[#111111] dark:text-[#FFFFFF] py-8 text-lg transition-colors">
          Loading requested products...
        </p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-lg transition-colors">
          No product requests found.
        </p>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm bg-[#FFFFFF] dark:bg-[#1A1A1A] transition-colors">
            <table className="min-w-[600px] w-full table-auto border-collapse">
              <thead className="bg-[#FF6B6B] text-white">
                <tr>
                  <th className="p-3 text-left text-sm sm:text-base whitespace-nowrap">Product Title</th>
                  <th className="p-3 text-left text-sm sm:text-base whitespace-nowrap">User Name</th>
                  <th className="p-3 text-left text-sm sm:text-base whitespace-nowrap">User Email</th>
                  <th className="p-3 text-center text-sm sm:text-base whitespace-nowrap">Status</th>
                  <th className="p-3 text-center text-sm sm:text-base whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, i) => (
                  <tr
                    key={req._id}
                    className={`hover:bg-[#FFD93D]/20 transition-colors duration-200 ${
                      i % 2 === 0 ? "bg-gray-50 dark:bg-[#111111]" : "bg-white dark:bg-[#1A1A1A]"
                    }`}
                  >
                    <td className="p-3 text-sm sm:text-base text-[#111111] dark:text-[#FFFFFF]">
                      {req.productTitle}
                    </td>
                    <td className="p-3 text-sm sm:text-base text-[#111111] dark:text-[#FFFFFF]">
                      {req.userName}
                    </td>
                    <td className="p-3 text-sm sm:text-base text-[#111111] dark:text-[#FFFFFF]">
                      {req.userEmail}
                    </td>
                    <td className="p-3 text-center text-sm sm:text-base capitalize text-[#111111] dark:text-[#FFFFFF]">
                      {req.status}
                    </td>
                    <td className="p-3 text-center flex flex-col sm:flex-row justify-center items-center gap-2">
                      {req.status !== "delivered" ? (
                        <button
                          onClick={() => handleServe(req._id)}
                          disabled={servingId === req._id}
                          className={`px-4 py-1 rounded text-white text-sm sm:text-base w-full sm:w-auto transition-all duration-300 ${
                            servingId === req._id
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-[#FF6B6B] hover:bg-[#FFD93D] hover:text-[#111111]"
                          }`}
                        >
                          {servingId === req._id ? "Serving..." : "Delivery"}
                        </button>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                          Delivered
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-[#FF6B6B] hover:bg-[#FFD93D] hover:text-[#111111] text-white rounded disabled:opacity-50 w-full sm:w-auto transition-all duration-300"
            >
              Prev
            </button>

            <span className="font-semibold text-[#111111] dark:text-[#FFFFFF] text-center w-full sm:w-auto transition-colors">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="px-4 py-2 bg-[#FF6B6B] hover:bg-[#FFD93D] hover:text-[#111111] text-white rounded disabled:opacity-50 w-full sm:w-auto transition-all duration-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ServeProducts;
