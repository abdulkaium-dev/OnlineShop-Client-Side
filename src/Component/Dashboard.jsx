import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import { 
  FaUser, 
  FaUsers, 
  FaBoxOpen, 
  FaClipboardList, 
  FaRegStar, 
  FaConciergeBell, 
  FaCalendarAlt 
} from "react-icons/fa";
import useRole from "../hooks/Admin";

const Dashboard = () => {
  const [role, loading] = useRole();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-[#111111]">
        Loading Dashboard...
      </div>
    );
  }

  const isAdmin = role === "admin";

  const adminLinks = [
    {
      to: "/dashboard/admin-profile",
      label: "Admin Profile",
      icon: <GrUserAdmin className="text-[#FF6B6B] w-5 h-5" />,
    },
    {
      to: "/dashboard/manage-users",
      label: "Manage Users",
      icon: <FaUsers className="text-[#FFD93D] w-5 h-5" />,
    },
    {
      to: "/dashboard/add-product",
      label: "Add Product",
      icon: <FaBoxOpen className="text-[#FF6B6B] w-5 h-5" />,
    },
    {
      to: "/dashboard/all-products",
      label: "All Products",
      icon: <FaClipboardList className="text-[#FFD93D] w-5 h-5" />,
    },
    {
      to: "/dashboard/all-reviews",
      label: "All Reviews",
      icon: <FaRegStar className="text-[#FF6B6B] w-5 h-5" />,
    },
    {
      to: "/dashboard/serve-products",
      label: "Delivery Product",
      icon: <FaConciergeBell className="text-[#FFD93D] w-5 h-5" />,
    },
    {
      to: "/dashboard/upcoming-products",
      label: "Upcoming Products",
      icon: <FaCalendarAlt className="text-[#FF6B6B] w-5 h-5" />,
    },
  ];

  const userLinks = [
    {
      to: "/dashboard/my-profile",
      label: "My Profile",
      icon: <FaUser className="text-[#FFD93D] w-5 h-5" />,
    },
    {
      to: "/dashboard/requested-products",
      label: "Requested Products",
      icon: <FaClipboardList className="text-[#FF6B6B] w-5 h-5" />,
    },
    {
      to: "/dashboard/my-reviews",
      label: "My Reviews",
      icon: <FaRegStar className="text-[#FFD93D] w-5 h-5" />,
    },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FFFFFF]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#111111] text-[#FFFFFF] shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          {isAdmin ? (
            <GrUserAdmin className="text-[#FF6B6B] w-8 h-8" />
          ) : (
            <FaUser className="text-[#FFD93D] w-8 h-8" />
          )}
          <span>{isAdmin ? "Admin Dashboard" : "User Dashboard"}</span>
        </h2>

        <nav className="flex flex-col gap-3 text-base">
          {links.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium hover:bg-[#FFD93D] hover:text-[#111111] transition-all duration-300"
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Top Navbar */}
      <header className="md:hidden bg-[#111111] text-[#FFFFFF] shadow flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          {isAdmin ? (
            <GrUserAdmin className="text-[#FF6B6B] w-7 h-7" />
          ) : (
            <FaUser className="text-[#FFD93D] w-7 h-7" />
          )}
          <h1 className="text-lg sm:text-xl font-semibold">
            {isAdmin ? "Admin Dashboard" : "User Dashboard"}
          </h1>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          className="focus:outline-none"
        >
          <svg
            className="w-8 h-8 text-[#FFD93D]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <nav className="md:hidden bg-[#FFFFFF] text-[#111111] shadow-lg p-4 flex flex-col gap-3">
          {links.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FF6B6B] hover:text-[#FFFFFF] transition-all duration-300"
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
      )}

      {/* Main Dashboard Content */}
      <main className="flex-1 bg-[#FFFFFF] p-6 md:p-10">
        <div className="bg-[#FFFFFF] shadow-md rounded-2xl p-4 md:p-6 border border-[#FF6B6B]/10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
