import React, { useEffect, useState, useMemo } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import UserViewModal from "./UserViewModal";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [confirmId, setConfirmId] = useState(null);

  const fetchUsers = async (opts = {}) => {
    setLoading(true);
    setError("");
    try {
      const params = { page: opts.page || page, limit: opts.limit || limit };
      if (opts.q !== undefined) params.q = opts.q;
      if (query && opts.q === undefined) params.q = query;

      const { data } = await api.get("/admin/users", { params });
      setUsers(data.data || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
      setPage(data.page || params.page);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers({ page: 1, limit, q: query });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  // client-side filtered removed in favor of server-driven search/pagination
  const filtered = users;

  const deactivate = async (id) => {
    try {
      const { data } = await api.put(`/admin/users/${id}`, { status: "Inactive" });
      toast.success(data.message || "User updated");
      // refresh current page
      fetchUsers({ page, limit });
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setConfirmId(null);
    }
  };

  const updateRole = async (id, role) => {
    try {
      const { data } = await api.put(`/admin/users/${id}`, { role });
      toast.success(data.message || "Role updated");
      setUsers((s) => s.map((u) => (u._id === id ? data.data : u)));
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Update failed");
    }
  };

  const onSearch = (q) => {
    setPage(1);
    fetchUsers({ page: 1, limit, q });
  };

  if (loading) return <div className="p-6">Loading users...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Customers</h2>
        <div className="flex items-center gap-2">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by name or email" className="px-3 py-2 border rounded-md" />
          <button onClick={fetchUsers} className="px-3 py-2 bg-indigo-600 text-white rounded">Refresh</button>
        </div>
      </div>

      {error ? (
        <div className="text-red-600 mb-4">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-sm text-gray-600">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 px-2">User</th>
                <th className="py-2 px-2">Email</th>
                <th className="py-2 px-2">Phone</th>
                <th className="py-2 px-2">Role</th>
                <th className="py-2 px-2">Status</th>
                <th className="py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 flex items-center gap-3">
                    <img src={u.photo || "https://placehold.co/40x40"} alt="u" className="w-8 h-8 rounded-full object-cover" />
                    <div className="font-medium">{u.fullName}</div>
                  </td>
                  <td className="py-3 px-2 text-sm">{u.email}</td>
                  <td className="py-3 px-2 text-sm">{u.phone}</td>
                  <td className="py-3 px-2 text-sm">
                    <select value={u.role} onChange={(e)=>updateRole(u._id,e.target.value)} className="px-2 py-1 border rounded text-sm">
                      <option>Admin</option>
                      <option>User</option>
                    </select>
                  </td>
                  <td className="py-3 px-2 text-sm">{u.status}</td>
                  <td className="py-3 px-2 text-sm">
                    <div className="flex items-center gap-2">
                      <button onClick={()=>setSelected(u)} className="px-2 py-1 bg-sky-600 text-white rounded text-xs">View</button>
                      {u.status !== 'Inactive' && (
                        <button onClick={()=>setConfirmId(u._id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Deactivate</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination controls */}
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing {users.length} of {total}</div>
            <div className="flex items-center gap-2">
              <button disabled={page<=1} onClick={()=>{ setPage(p=>Math.max(1,p-1)); fetchUsers({ page: Math.max(1,page-1), limit }); }} className="px-2 py-1 border rounded disabled:opacity-50">Prev</button>
              <div className="px-3 py-1 border rounded">Page {page} / {pages}</div>
              <button disabled={page>=pages} onClick={()=>{ setPage(p=>Math.min(pages,p+1)); fetchUsers({ page: Math.min(pages,page+1), limit }); }} className="px-2 py-1 border rounded disabled:opacity-50">Next</button>
              <select value={limit} onChange={(e)=>{ setLimit(Number(e.target.value)); }} className="px-2 py-1 border rounded">
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <UserViewModal user={selected} onClose={()=>setSelected(null)} />

      {/* Confirm modal for deactivate */}
      {confirmId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow max-w-sm w-full">
            <div className="mb-3 font-medium">Confirm Deactivation</div>
            <div className="text-sm text-gray-700 mb-4">Are you sure you want to deactivate this user?</div>
            <div className="flex justify-end gap-2">
              <button onClick={()=>setConfirmId(null)} className="px-3 py-1 border rounded">Cancel</button>
              <button onClick={()=>deactivate(confirmId)} className="px-3 py-1 bg-red-600 text-white rounded">Deactivate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers