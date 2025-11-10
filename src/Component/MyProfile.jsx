import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import axiosInstance from "../Api/axios";

const MyProfile = () => {
  const { user: authUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authUser?.email) {
      axiosInstance
        .get(`/users/${authUser.email}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [authUser]);

  if (loading)
    return (
      <p className="text-center mt-10 text-[#111111]/70 font-medium">
        Loading user info...
      </p>
    );

  if (!user)
    return (
      <p className="text-center mt-10 text-[#FF6B6B] font-medium">
        User not found
      </p>
    );

  const badgeLabel = user.badge || "Bronze";
  const badgeClass = {
    Bronze: "bg-[#FF6B6B]",       // Soft Red
    Silver: "bg-gray-400",
    Gold: "bg-[#FFD93D]",         // Vibrant Yellow
    Platinum: "bg-purple-700",
  }[badgeLabel] || "bg-[#FF6B6B]";

  return (
    <div className="p-5 max-w-3xl mx-auto space-y-6 min-h-screen 
                    bg-[#FFFFFF] dark:bg-[#111111] transition-colors duration-500">
      <h2 className="text-3xl font-bold text-[#111111] dark:text-[#FFFFFF] text-center md:text-left">
        My Profile
      </h2>

      <div className="relative bg-[#FFFFFF] dark:bg-[#111111] p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center md:items-start md:gap-8 transition hover:shadow-2xl overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD93D]/20 via-[#FFFFFF] to-[#FF6B6B]/20 
                        dark:from-[#111111]/20 dark:via-[#111111] dark:to-[#111111]/40 rounded-xl pointer-events-none" />

        <img
          src={user.photoURL || "https://via.placeholder.com/96"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#FF6B6B] dark:border-[#FFD93D] mb-4 md:mb-0 z-10"
        />

        <div className="text-center md:text-left space-y-2 z-10">
          <h3 className="text-2xl font-semibold text-[#111111] dark:text-[#FFFFFF] flex items-center gap-2">
            {user.displayName || "No Name"}
          </h3>

          <p className="text-[#111111]/70 dark:text-[#FFFFFF]/70 flex items-center gap-2">
            📧 {user.email || "No Email"}
          </p>
          <p className="text-[#111111]/70 dark:text-[#FFFFFF]/70 flex items-center gap-2">
            📞 {user.phoneNumber || "No Phone"}
          </p>
          <p className="text-[#111111]/70 dark:text-[#FFFFFF]/70 flex items-center gap-2">
            🏠 {user.address || "No Address"}
          </p>
          <p className="text-[#111111]/70 dark:text-[#FFFFFF]/70">
            🗓 Member since: {new Date(user.createdAt).toLocaleDateString()}
          </p>

          <span
            className={`inline-block px-5 py-1 rounded-full text-[#FFFFFF] font-semibold ${badgeClass} text-sm`}
          >
            {badgeLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
