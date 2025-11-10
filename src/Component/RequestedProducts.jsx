import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../Api/axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { AuthContext } from '../Auth/AuthContext';

const ITEMS_PER_PAGE = 10;

const RequestedProducts = () => {
  const { user } = useContext(AuthContext);

  const [requestedProducts, setRequestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRequestedProducts = async (page = 1) => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const token = await user.getIdToken();
      const { data } = await axiosInstance.get(`/requested-products/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit: ITEMS_PER_PAGE },
      });

      setRequestedProducts(data.requests);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch requested products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestedProducts(currentPage);
  }, [user?.email, currentPage]);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this product request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF6B6B', // Primary Accent
      cancelButtonColor: '#FFD93D',  // Secondary Accent
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);
      await axiosInstance.delete(`/product-requests/${id}`);
      toast.success('Product request cancelled');
      fetchRequestedProducts(currentPage);
    } catch (err) {
      console.error(err);
      toast.error('Failed to cancel product request');
    } finally {
      setDeletingId(null);
    }
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-[#111111]/70 font-medium">
        Loading your requested products...
      </p>
    );

  if (requestedProducts.length === 0)
    return (
      <p className="text-center mt-10 text-[#111111]/70 font-medium">
        No requested products found.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-[#111111] text-center md:text-left">
        Your Requested Products
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-md border border-[#111111]/20 bg-[#FFFFFF] dark:bg-[#111111] transition-colors">
        <table className="min-w-full divide-y divide-[#111111]/20">
          <thead className="bg-[#FFD93D]/20 dark:bg-[#FFD93D]/10">
            <tr>
              {['Product Title', 'Likes', 'Reviews', 'Status', 'Requested At', 'Action'].map((col) => (
                <th
                  key={col}
                  className="py-3 px-4 text-left text-sm font-semibold text-[#111111] dark:text-[#FFFFFF] text-center"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#111111]/20">
            {requestedProducts.map(({ _id, productTitle, likes, reviewCount, status, requestedAt }) => (
              <tr key={_id} className="hover:bg-[#FFD93D]/10 dark:hover:bg-[#FFD93D]/20 transition-colors">
                <td className="py-3 px-4 text-sm text-[#111111] dark:text-[#FFFFFF]">{productTitle}</td>
                <td className="py-3 px-4 text-center text-sm text-[#111111]/70 dark:text-[#FFFFFF]/70">{likes}</td>
                <td className="py-3 px-4 text-center text-sm text-[#111111]/70 dark:text-[#FFFFFF]/70">{reviewCount}</td>
                <td className="py-3 px-4 text-center text-sm capitalize text-[#111111]/70 dark:text-[#FFFFFF]/70">{status}</td>
                <td className="py-3 px-4 text-sm text-[#111111]/70 dark:text-[#FFFFFF]/70">
                  {new Date(requestedAt).toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center text-sm">
                  <button
                    onClick={() => handleCancel(_id)}
                    disabled={deletingId === _id}
                    className={`inline-block px-3 py-1 rounded text-white font-medium transition-colors ${
                      deletingId === _id
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#FF6B6B] hover:bg-[#FFD93D] dark:hover:bg-[#FFD93D]'
                    }`}
                  >
                    {deletingId === _id ? 'Cancelling...' : 'Cancel'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-[#111111]/20 bg-[#FFFFFF] dark:bg-[#111111] text-[#111111] dark:text-[#FFFFFF] hover:bg-[#FFD93D]/20 dark:hover:bg-[#FFD93D]/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>
        <span className="px-3 py-1 rounded border border-[#111111]/20 bg-[#FFFFFF] dark:bg-[#111111] text-[#111111] dark:text-[#FFFFFF]">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-[#111111]/20 bg-[#FFFFFF] dark:bg-[#111111] text-[#111111] dark:text-[#FFFFFF] hover:bg-[#FFD93D]/20 dark:hover:bg-[#FFD93D]/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RequestedProducts;
