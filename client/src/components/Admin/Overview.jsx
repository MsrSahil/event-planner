import React, { useEffect, useState } from "react";
import api from "../../config/api";

const StatCard = ({ title, value, children }) => (
  <div className="bg-white shadow rounded p-4 w-full">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-semibold mt-2">{value}</div>
    {children}
  </div>
);

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ bookings: 0, banquets: 0, caterers: 0, contacts: 0 });
  const [recent, setRecent] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [bRes, hRes, cRes, qRes] = await Promise.all([
        api.get("/admin/bookings"),
        api.get("/admin/banquetHalls"),
        api.get("/admin/catering"),
        api.get("/admin/contacts"),
      ]);

      const bookings = bRes.data?.data || [];
      const banquets = hRes.data?.data || [];
      const caterers = cRes.data?.data || [];
      const contacts = qRes.data?.data || [];

      setStats({ bookings: bookings.length, banquets: banquets.length, caterers: caterers.length, contacts: contacts.length });
      setRecent(bookings.slice(0, 6));
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Failed to load overview data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading overview...</div>;

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Admin Overview</h2>
        <button onClick={fetchData} className="px-3 py-2 bg-indigo-600 text-white rounded">Refresh</button>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Bookings" value={stats.bookings} />
        <StatCard title="Banquet Halls" value={stats.banquets} />
        <StatCard title="Caterers" value={stats.caterers} />
        <StatCard title="Customer Queries" value={stats.contacts} />
      </div>

      <div className="bg-white shadow rounded p-4">
        <h3 className="font-medium mb-3">Recent Bookings</h3>
        {recent.length === 0 ? (
          <div className="text-sm text-gray-600">No recent bookings</div>
        ) : (
          <div className="space-y-2">
            {recent.map((b) => (
              <div key={b._id} className="flex items-center justify-between border p-2 rounded">
                <div>
                  <div className="font-medium">{b.hallName || "-"} — {b.title || "-"}</div>
                  <div className="text-xs text-gray-500">By {b.user?.fullName || "Unknown"} • {new Date(b.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-sm font-medium">{b.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;