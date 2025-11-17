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

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data.data || []);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    if (!query) return users;
    const q = query.toLowerCase();
    return users.filter((u) => (u.fullName || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q));
  }, [users, query]);

  const deactivate = async (id) => {
    try {
      const { data } = await api.put(`/admin/users/${id}`, { status: "Inactive" });
      toast.success(data.message || "User updated");
      setUsers((s) => s.map((u) => (u._id === id ? data.data : u)));
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Update failed");
    }
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
                  <td className="py-3 px-2"><div className="font-medium">{u.fullName}</div></td>
                  <td className="py-3 px-2 text-sm">{u.email}</td>
                  <td className="py-3 px-2 text-sm">{u.phone}</td>
                  <td className="py-3 px-2 text-sm">{u.role}</td>
                  <td className="py-3 px-2 text-sm">{u.status}</td>
                  <td className="py-3 px-2 text-sm">
                    <div className="flex items-center gap-2">
                      <button onClick={()=>setSelected(u)} className="px-2 py-1 bg-sky-600 text-white rounded text-xs">View</button>
                      {u.status !== 'Inactive' && (
                        <button onClick={()=>deactivate(u._id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Deactivate</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <UserViewModal user={selected} onClose={()=>setSelected(null)} />
    </div>
  );
};

export default Customers