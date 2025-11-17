import React, { useEffect, useState, useMemo } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  Completed: "bg-blue-100 text-blue-800",
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/admin/bookings");
      setBookings(data.data || []);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filtered = useMemo(() => {
    if (!query) return bookings;
    const q = query.toLowerCase();
    return bookings.filter((b) => {
      const userName = b.user?.fullName || "";
      const userEmail = b.user?.email || "";
      return (
        userName.toLowerCase().includes(q) ||
        userEmail.toLowerCase().includes(q) ||
        (b.hallName || "").toLowerCase().includes(q) ||
        (b.title || "").toLowerCase().includes(q)
      );
    });
  }, [bookings, query]);

  const updateStatus = async (id, status) => {
    const prev = bookings;
    try {
      // optimistic UI
      setBookings((s) => s.map((b) => (b._id === id ? { ...b, status } : b)));
      const payload = { id, status };
      const { data } = await api.post("/admin/bookings", payload);
      if (data?.data) {
        // replace with returned booking
        setBookings((s) => s.map((b) => (b._id === id ? data.data : b)));
        toast.success(data.message || "Booking updated");
      }
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Failed to update booking");
      setBookings(prev);
    }
  };

  if (loading) return <div className="p-6">Loading bookings...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Bookings</h2>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by user, email, hall or title"
            className="px-3 py-2 border rounded-md"
          />
          <button
            onClick={fetchBookings}
            className="px-3 py-2 bg-indigo-600 text-white rounded-md"
          >
            Refresh
          </button>
        </div>
      </div>

      {error ? (
        <div className="text-red-600 mb-4">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-sm text-gray-600">No bookings found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 px-2">ID</th>
                <th className="py-2 px-2">User</th>
                <th className="py-2 px-2">Hall / Title</th>
                <th className="py-2 px-2">Date</th>
                <th className="py-2 px-2">Amount</th>
                <th className="py-2 px-2">Status</th>
                <th className="py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 text-sm">{b._id.slice(-6)}</td>
                  <td className="py-3 px-2 text-sm">
                    <div className="font-medium">{b.user?.fullName || "-"}</div>
                    <div className="text-xs text-gray-500">{b.user?.email || "-"}</div>
                  </td>
                  <td className="py-3 px-2 text-sm">
                    <div>{b.hallName || "-"}</div>
                    <div className="text-xs text-gray-500">{b.title || "-"}</div>
                  </td>
                  <td className="py-3 px-2 text-sm">{b.date ? new Date(b.date).toLocaleString() : "-"}</td>
                  <td className="py-3 px-2 text-sm">{b.amount ?? b.price ?? "-"}</td>
                  <td className="py-3 px-2 text-sm">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusColors[b.status] || "bg-gray-100 text-gray-800"}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm">
                    <div className="flex items-center gap-2">
                      {b.status !== "Confirmed" && (
                        <button
                          onClick={() => updateStatus(b._id, "Confirmed")}
                          className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                        >
                          Confirm
                        </button>
                      )}
                      {b.status !== "Cancelled" && (
                        <button
                          onClick={() => updateStatus(b._id, "Cancelled")}
                          className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                        >
                          Cancel
                        </button>
                      )}
                      {b.status !== "Completed" && (
                        <button
                          onClick={() => updateStatus(b._id, "Completed")}
                          className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                        >
                          Complete
                        </button>
                      )}
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

export default Bookings;