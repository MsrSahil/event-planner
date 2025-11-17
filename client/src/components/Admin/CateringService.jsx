import React, { useEffect, useState, useMemo } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";

const CateringService = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/admin/catering");
      setItems(res.data?.data || []);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Failed to load catering items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((it) => (it.name || "").toLowerCase().includes(q) || (it.description || "").toLowerCase().includes(q));
  }, [items, query]);

  const handleDelete = async (id) => {
    const prev = items;
    try {
      setItems((s) => s.filter((i) => i._id !== id));
      const { data } = await api.delete(`/admin/catering/${id}`);
      toast.success(data.message || "Deleted");
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Delete failed");
      setItems(prev);
    }
  };

  if (loading) return <div className="p-6">Loading catering services...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Catering Services</h2>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or description"
            className="px-3 py-2 border rounded-md"
          />
          <button onClick={fetchItems} className="px-3 py-2 bg-indigo-600 text-white rounded-md">Refresh</button>
        </div>
      </div>

      {error ? (
        <div className="text-red-600 mb-4">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-sm text-gray-600">No catering services found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 px-2">Name</th>
                <th className="py-2 px-2">Price</th>
                <th className="py-2 px-2">Description</th>
                <th className="py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((it) => (
                <tr key={it._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2">{it.name}</td>
                  <td className="py-3 px-2">{it.price ?? "-"}</td>
                  <td className="py-3 px-2 text-sm text-gray-600">{it.description || "-"}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => toast('Edit not implemented yet')} className="px-2 py-1 bg-yellow-500 text-white rounded text-xs">Edit</button>
                      <button onClick={() => handleDelete(it._id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CateringService;