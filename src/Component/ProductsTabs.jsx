import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../Api/axios";
import { getAuth } from "firebase/auth";

const categories = ['All', 'Electronics', 'Fashion', 'Footwear', 'Accessories'];

const ProductsTabs = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-screen bg-[#FFFFFF] transition-colors duration-500">

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-full transition duration-300
              ${activeTab === cat
                ? 'bg-[#FF6B6B] text-[#FFFFFF] shadow-lg'
                : 'bg-[#FFFFFF] text-[#111111] border border-[#FF6B6B] hover:bg-[#FFD93D]/20 hover:text-[#111111]'
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
            <div key={idx} className="flex flex-col h-full rounded-xl overflow-hidden shadow-lg bg-[#FFFFFF] animate-pulse">
              <div className="h-48 sm:h-52 md:h-56 w-full bg-gray-200"></div>
              <div className="flex flex-col flex-grow p-5 space-y-3">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4 mt-auto"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 && (
            <p className="text-center col-span-full text-[#111111] font-medium">
              No products available in this category.
            </p>
          )}

          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition bg-[#FFFFFF] text-[#111111]"
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

                <p className="text-sm sm:text-base mt-2 line-clamp-3 flex-grow text-[#111111]/70">
                  {product.description || 'No description available.'}
                </p>

                <p className="font-bold mt-2 text-[#FF6B6B]">
                  ${product.price?.toFixed(2) || '0.00'}
                </p>

                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="mt-auto bg-[#FF6B6B] text-[#FFFFFF] hover:bg-[#FFD93D] hover:text-[#111111] py-2 sm:py-3 rounded-md font-semibold transition text-sm sm:text-base"
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
