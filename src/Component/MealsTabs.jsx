import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../Api/axios";
import { getAuth } from "firebase/auth";

// Online shop categories
const categories = ['All', 'Electronics', 'Fashion', 'Footwear', 'Accessories'];

const ProductsTabs = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const token = user ? await user.getIdToken() : null;

        const params = { limit: 6 };
        if (activeTab !== 'All') params.category = activeTab;

        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const { data } = await axiosInstance.get('/products', { params, headers });
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-full transition duration-300
              ${activeTab === cat
                ? 'bg-indigo-600 text-white shadow-lg dark:bg-indigo-500 dark:text-gray-100'
                : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-cyan-400/20 hover:text-gray-900 dark:bg-gray-800 dark:text-indigo-400 dark:border-indigo-500 dark:hover:bg-cyan-600/30 dark:hover:text-white'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="flex flex-col h-full rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 animate-pulse">
              <div className="h-48 sm:h-52 md:h-56 w-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex flex-col flex-grow p-5 space-y-3">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mt-auto"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 && (
            <p className="text-center col-span-full text-gray-700 dark:text-gray-300 font-medium">
              No products available in this category.
            </p>
          )}

          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition bg-white dark:bg-gray-800 dark:text-gray-100"
            >
              {/* Image */}
              <div className="h-48 sm:h-52 md:h-56 w-full overflow-hidden">
                <img
                  src={product.image || 'https://via.placeholder.com/400x240?text=No+Image'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-5">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold truncate">
                  {product.title}
                </h2>

                <p className="text-sm sm:text-base mt-2 line-clamp-3 flex-grow text-gray-600 dark:text-gray-300">
                  {product.description || 'No description available.'}
                </p>

                <p className="font-bold mt-2 text-indigo-600 dark:text-indigo-400">
                  ${product.price?.toFixed(2) || '0.00'}
                </p>

                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="mt-auto bg-indigo-600 text-white hover:bg-cyan-400 hover:text-gray-900 py-2 sm:py-3 rounded-md font-semibold transition text-sm sm:text-base dark:bg-indigo-500 dark:text-gray-100 dark:hover:bg-cyan-600 dark:hover:text-white"
                >
                  See More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsTabs;
