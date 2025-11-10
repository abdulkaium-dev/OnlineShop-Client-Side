import React, { useEffect, useState } from 'react';
import axiosInstance from '../Api/axios';
import Swal from 'sweetalert2';

const UpcomingProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [publishingId, setPublishingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    ingredients: '',
    description: '',
    price: '',
    publishDate: '',
    distributorName: '',
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/upcoming-products');
      if (Array.isArray(res.data)) {
        setProducts(res.data.sort((a, b) => (b.likes || 0) - (a.likes || 0)));
      } else {
        Swal.fire('Error', 'Unexpected data from server', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (!formData[key]) {
        Swal.fire('Missing Field', `Please fill in ${key}`, 'error');
        return;
      }
    }
    if (isNaN(formData.price) || Number(formData.price) <= 0) {
      Swal.fire('Invalid Price', 'Price must be positive', 'error');
      return;
    }
    try {
      setAdding(true);
      const res = await axiosInstance.post('/upcoming-products', {
        ...formData,
        price: parseFloat(formData.price),
      });
      if (res.data.success) {
        Swal.fire({ icon: 'success', title: 'product added', timer: 1500, showConfirmButton: false });
        setShowModal(false);
        setFormData({
          title: '',
          category: '',
          image: '',
          ingredients: '',
          description: '',
          price: '',
          publishDate: '',
          distributorName: '',
        });
        fetchProducts();
      } else {
        Swal.fire('Failed', 'Could not add product', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Server Error', 'Could not add product', 'error');
    } finally {
      setAdding(false);
    }
  };

  const handlePublish = async (productId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to publish this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, publish it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      setPublishingId(productId);
      const res = await axiosInstance.post('/upcoming-products/publish', {
        productId,
        addedByEmail: 'admin@example.com',
      });

      if (res.data.success) {
        Swal.fire({ icon: 'success', title: 'Published!', timer: 1500, showConfirmButton: false });
        fetchProducts();
      } else {
        Swal.fire('Failed', res.data.message || 'Could not publish product', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Failed', err.response?.data?.message || 'Server error', 'error');
    } finally {
      setPublishingId(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">Upcoming products Admin</h1>

      {/* Add Upcoming product Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition"
      >
        + Add Upcoming product
      </button>

      {/* products Table */}
      {loading ? (
        <p className="text-gray-900 dark:text-gray-100">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-900 dark:text-gray-100">No upcoming products found</p>
      ) : (
        <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                {['Title', 'Category', 'Likes', 'Publish Date', 'Distributor', 'Actions'].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left text-gray-900 dark:text-gray-200 font-medium uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <td className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">{product.title}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{product.category}</td>
                  <td className="px-4 py-2 text-center text-gray-900 dark:text-gray-100 font-semibold">{product.likes || 0}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{new Date(product.publishDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{product.distributorName}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      disabled={publishingId === product._id}
                      onClick={() => handlePublish(product._id)}
                      className={`px-3 py-1 rounded-md text-white font-semibold transition ${
                        publishingId === product._id ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      {publishingId === product._id ? 'Publishing...' : 'Publish'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg transition-colors">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Add Upcoming product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  <label className="block mb-1 text-gray-900 dark:text-gray-100 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                  {key === 'description' || key === 'ingredients' ? (
                    <textarea
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  ) : (
                    <input
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      type={key === 'price' ? 'number' : key === 'publishDate' ? 'date' : 'text'}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-semibold rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
                >
                  {adding ? 'Adding...' : 'Add product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingProductsAdmin;
