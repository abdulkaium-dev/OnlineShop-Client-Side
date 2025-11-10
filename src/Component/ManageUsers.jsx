import React, { useEffect, useState } from "react";
import axiosInstance from "../Api/axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/users", {
        params: { search, page, limit },
      });
      setUsers(res.data.users);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  const makeAdmin = async (id, email) => {
    const confirm = await Swal.fire({
      title: "Make Admin?",
      text: `Are you sure you want to make ${email} an admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6B6B",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, make admin!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosInstance.patch(`/users/${id}/make-admin`);
      if (res.data.success) {
        Swal.fire("Success", "User is now an admin!", "success");
        fetchUsers();
      } else {
        Swal.fire("Error", res.data.message || "Could not update user", "error");
      }
    } catch (err) {
      console.error("Error making admin:", err);
      Swal.fire("Error", "Could not update user", "error");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto bg-[#FFFFFF] rounded-2xl shadow-md mt-10 transition-all duration-300">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-[#111111] text-center md:text-left border-b-2 border-[#FF6B6B]/40 pb-2">
        Manage Users
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by name or email"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-6 px-4 py-2 border border-[#111111]/20 rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] bg-[#FFFFFF] text-[#111111] placeholder-gray-400"
      />

      {/* Table */}
      {loading ? (
        <p className="text-center text-[#111111]/70 py-8">Loading users...</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-[#111111]/10 shadow-sm">
            <table className="min-w-full divide-y divide-[#111111]/10">
              <thead className="bg-[#FF6B6B] text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Username</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Subscription</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="bg-[#FFFFFF] divide-y divide-[#111111]/10">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-[#111111]/60">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user, idx) => (
                    <tr
                      key={user._id}
                      className="hover:bg-[#FFD93D]/10 transition-colors duration-200"
                    >
                      <td className="px-4 py-3 text-sm text-[#111111] whitespace-nowrap">
                        {(page - 1) * limit + idx + 1}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#111111] whitespace-nowrap">
                        {user.displayName || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#111111] whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-[#111111] font-semibold ${
                            user.badge === "Gold"
                              ? "bg-[#FFD93D]"
                              : user.badge === "Silver"
                              ? "bg-gray-300"
                              : "bg-[#FF6B6B]/20"
                          }`}
                        >
                          {user.badge || "Bronze"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#111111] whitespace-nowrap capitalize">
                        {user.role}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {user.role === "admin" ? (
                          <span className="text-green-600 font-semibold">Admin</span>
                        ) : (
                          <button
                            onClick={() => makeAdmin(user._id, user.email)}
                            className="bg-[#FF6B6B] hover:bg-[#FFD93D] hover:text-[#111111] text-white px-4 py-1.5 rounded-md font-medium transition-all duration-200 shadow-sm"
                          >
                            Make Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3 text-[#111111]/80 text-sm">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-4 py-2 bg-[#FFFFFF] border border-[#111111]/20 rounded-md hover:bg-[#FFD93D]/20 disabled:opacity-50 transition-all"
              >
                Prev
              </button>
              <span>
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="px-4 py-2 bg-[#FFFFFF] border border-[#111111]/20 rounded-md hover:bg-[#FFD93D]/20 disabled:opacity-50 transition-all"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageUsers;
