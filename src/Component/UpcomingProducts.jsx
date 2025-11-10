import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../Api/axios";
import { AuthContext } from "../Auth/AuthContext";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";

const UpcomingProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [userBadge, setUserBadge] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUpcomingProducts = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      let headers = {};

      if (currentUser) {
        const token = await currentUser.getIdToken();
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await axiosInstance.get("/upcoming-products", { headers });
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to fetch upcoming products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBadge = async () => {
    if (!user?.email) return;
    try {
      const res = await axiosInstance.get(`/users/${user.email}`);
      setUserBadge(res.data.badge || null);
    } catch {
      toast.error("Failed to fetch user badge");
      setUserBadge(null);
    }
  };

  const handleLike = async (productId) => {
    if (!user?.email) {
      toast.error("Please login to like products");
      return;
    }
    if (!["Silver", "Gold", "Platinum"].includes(userBadge)) {
      toast.error("Only premium users can like products");
      return;
    }

    const product = products.find((m) => m._id === productId);
    if (!product) return;

    const alreadyLiked = product.likedBy?.includes(user.email);
    if (alreadyLiked) {
      toast.error("You already liked this product");
      return;
    }

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error("User not authenticated");
        return;
      }

      const token = await currentUser.getIdToken();
      const res = await axiosInstance.patch(
        `/upcoming-products/${productId}/like`,
        { userEmail: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Liked the product!");
        setProducts((prev) =>
          prev.map((m) =>
            m._id === productId
              ? {
                  ...m,
                  likes: (m.likes || 0) + 1,
                  likedBy: [...(m.likedBy || []), user.email],
                }
              : m
          )
        );
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to like product";
      toast.error(msg);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUserBadge();
    fetchUpcomingProducts();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-medium text-gray-700 dark:text-gray-300">
        Loading upcoming products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-lg font-medium text-gray-500 dark:text-gray-400">
        No upcoming products found.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white drop-shadow-md">
        🌟 Upcoming Products
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-10 text-center">
        Showing {products.length} upcoming product{products.length > 1 ? "s" : ""}
      </p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const alreadyLiked = product.likedBy?.includes(user?.email);
          const canLike =
            user &&
            userBadge &&
            ["Silver", "Gold", "Platinum"].includes(userBadge) &&
            !alreadyLiked;

          let formattedDate = "No date";
          if (product.publishDate) {
            const dateObj = new Date(product.publishDate);
            if (!isNaN(dateObj)) formattedDate = dateObj.toLocaleDateString();
          }

          return (
            <article
              key={product._id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
              aria-label={`Upcoming product: ${product.title}`}
            >
              <div className="h-52 w-full relative overflow-hidden rounded-t-3xl">
                <img
                  src={product.image}
                  alt={product.title || "Upcoming product"}
                  className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {product.likes > 0 && (
                  <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                    ❤️ {product.likes}
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white truncate">
                  {product.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-grow line-clamp-3">
                  {product.description}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-5 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 w-fit">
                  📅 Publish: {formattedDate}
                </p>

                {user ? (
                  ["Silver", "Gold", "Platinum"].includes(userBadge) ? (
                    <button
                      onClick={() => handleLike(product._id)}
                      disabled={!canLike}
                      className={`w-full py-2 rounded-xl font-semibold text-white transition ${
                        !canLike
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-300"
                      }`}
                      aria-disabled={!canLike}
                    >
                      {alreadyLiked ? "Liked ❤️" : "Like ❤️"}
                    </button>
                  ) : (
                    <p className="text-xs text-red-500 font-semibold mt-auto text-center">
                      Only premium users can like
                    </p>
                  )
                ) : (
                  <p className="text-xs text-red-500 font-semibold mt-auto text-center">
                    Please login to like products
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingProducts;
