import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";

export const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchAdminProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://online-shop-server-side.vercel.app/admin/profile/${user.email}`
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch admin profile");
        }
        const data = await res.json();
        setAdminData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [user?.email]);

  if (loading)
    return (
      <p className="text-center mt-10 text-[#111111]/60 font-medium">
        Loading profile...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-[#FF6B6B] font-medium">{error}</p>
    );

  if (!adminData) return null;

  const badgeLabel = adminData.role || "Admin";

  return (
    <div className="p-5 sm:p-8 max-w-3xl mx-auto min-h-screen bg-[#FFFFFF] transition-colors duration-300 space-y-6 rounded-2xl shadow-md">
      {/* Title */}
      <h2 className="text-3xl font-bold text-[#111111] text-center md:text-left border-b-2 border-[#FF6B6B]/40 pb-2">
        My Profile
      </h2>

      {/* Profile Card */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 bg-[#FFFFFF] border border-[#111111]/10 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Accent background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD93D]/10 via-white to-[#FF6B6B]/10 opacity-50 rounded-2xl pointer-events-none" />

        {/* Profile Image */}
        <img
          src={adminData.image || user.photoURL || "https://via.placeholder.com/96"}
          alt={adminData.name || user.displayName || "Admin"}
          className="w-28 h-28 rounded-full object-cover border-4 border-[#FF6B6B] mb-4 md:mb-0 z-10 shadow-md"
        />

        {/* Profile Info */}
        <div className="text-center md:text-left space-y-2 z-10">
          <h3 className="text-2xl font-semibold text-[#111111] flex items-center gap-2 justify-center md:justify-start">
            {adminData.name || user.displayName}
          </h3>

          <p className="text-[#111111]/80 flex items-center gap-2 justify-center md:justify-start">
            📧 {adminData.email || user.email}
          </p>
          <p className="text-[#111111]/80 flex items-center gap-2 justify-center md:justify-start">
            📞 {adminData.phoneNumber || "No Phone"}
          </p>
          <p className="text-[#111111]/80 flex items-center gap-2 justify-center md:justify-start">
            🏠 {adminData.address || "No Address"}
          </p>
          <p className="text-[#111111]/80">
            🗓 Member since:{" "}
            {adminData.createdAt
              ? new Date(adminData.createdAt).toLocaleDateString()
              : "N/A"}
          </p>

          {/* Role Badge */}
          <span
            className={`inline-block px-5 py-1 rounded-full text-[#111111] font-semibold bg-[#FFD93D] mt-2 text-sm shadow-sm`}
          >
            {badgeLabel}
          </span>

          {/* Products Added Count */}
          <div className="mt-4 bg-[#FF6B6B]/10 text-[#FF6B6B] px-4 py-2 rounded-full font-semibold text-base sm:text-lg shadow-sm">
            🛒 Products Added: {adminData.productsAddedCount ?? 0}
          </div>
        </div>
      </div>
    </div>
  );
};
