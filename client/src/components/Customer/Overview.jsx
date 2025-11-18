import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api";

const Stat = ({ label, value }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-2 text-2xl font-bold">{value}</p>
  </div>
);

const statusClass = (s) =>
  s === "Confirmed"
    ? "bg-emerald-100 text-emerald-700"
    : s === "Pending"
    ? "bg-yellow-100 text-yellow-700"
    : "bg-red-100 text-red-700";

const Overview = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(user || null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfileAndBookings = async () => {
    setLoading(true);
    setError("");
    try {
      // fetch profile (server may return current user profile)
      const pRes = await api.get("/user/profile");
      const profileData = pRes.data?.data || profile;
      setProfile(profileData);
      // keep auth context in sync
      if (profileData) setUser(profileData);

      // fetch bookings for the current user
      const bRes = await api.get("/user/bookings");
      const bookingsData = bRes.data?.data || [];
      // sort descending by date or createdAt
      bookingsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBookings(bookingsData);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Failed to load overview data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="p-6">Loading overview...</div>;

  const upcoming = bookings.filter((b) => new Date(b.date) >= new Date() && b.status !== "Cancelled").length;
  const total = bookings.length;
  // messages placeholder - if you have a messages endpoint, fetch counts similarly
  const messages = 0;

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="col-span-1 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center gap-4">
            <img
              src={profile?.photo || "https://placehold.co/80x80?text=U"}
              alt="User avatar"
              className="h-20 w-20 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-xl font-semibold">{profile?.fullName || "Your Name"}</h2>
              <p className="text-sm text-gray-500">Member since {profile?.createdAt ? new Date(profile.createdAt).getFullYear() : "-"}</p>
              <p className="mt-2 text-sm text-gray-700">{profile?.email || "-"}</p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <button className="w-full px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700">
              Edit Profile
            </button>
            <button className="w-full px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">
              Manage Bookings
            </button>
          </div>
        </div>

        {/* Stats and recent bookings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Stat label="Upcoming Bookings" value={upcoming} />
            <Stat label="Total Events" value={total} />
            <Stat label="Messages" value={messages} />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Bookings</h3>
              <button onClick={fetchProfileAndBookings} className="text-sm text-indigo-600 hover:underline">Refresh</button>
            </div>

            <ul className="mt-4 divide-y">
              {bookings.slice(0, 6).map((r) => (
                <li key={r._id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{r.hallName || r.title || "Booking"}</p>
                    <p className="text-sm text-gray-500">{r.date ? new Date(r.date).toLocaleString() : new Date(r.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass(r.status)}`}>
                      {r.status}
                    </span>
                  </div>
                </li>
              ))}
              {bookings.length === 0 && <li className="py-3 text-sm text-gray-600">You have no bookings yet.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;