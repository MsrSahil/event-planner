import React, { useEffect, useState } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import BookingDetailModal from "./BookingDetailModal";

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // The server exposes user profile at GET /user/profile — bookings (if any)
        // are expected to live on the returned user object. Adjusted to match server.
        const res = await api.get("/user/profile");
        // res.data.data is the current user object from server
        setBookings(res.data?.data?.bookings || []);
      } catch (err) {
        // if endpoint not available you'll see an error here
        toast.error(err.response?.data?.message || err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    // The backend currently doesn't expose a dedicated booking-cancel endpoint.
    // We'll optimistically mark the booking as cancelled locally and inform the user.
    // If you add a cancel endpoint to the server later, replace this with the API call.
    setActionLoading(id);
    try {
      // local optimistic update
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status: "Cancelled" } : b)));
      toast.success("Booking marked as Cancelled locally (server-side cancel not implemented)");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to cancel booking");
    } finally {
      setActionLoading(null);
    }
  };

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const openDetail = (booking) => {
    setSelectedBooking(booking);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Your Bookings</h1>
        <div className="text-sm text-gray-600">{user?.fullName ? `Hi, ${user.fullName.split(" ")[0]}` : ""}</div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
          <p className="text-lg text-gray-700 mb-3">No bookings yet</p>
          <p className="text-sm text-gray-500">Browse packages and create your first booking.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-between">
              <div>
                <p className="font-medium text-lg">{b.hallName || b.title || "Booking"}</p>
                <p className="text-sm text-gray-500">{new Date(b.date || b.bookingDate || b.createdAt).toLocaleString()}</p>
                <p className="text-sm text-gray-700 mt-2">Amount: <span className="font-semibold">{b.amount ? `₹${b.amount}` : b.price ? `₹${b.price}` : "-"}</span></p>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  b.status === "Confirmed" ? "bg-emerald-100 text-emerald-700" : b.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                }`}>{b.status || "Unknown"}</span>

                <div className="flex gap-2">
                  <button onClick={() => openDetail(b)} className="px-3 py-2 rounded-md border text-sm hover:bg-gray-50">View</button>
                  {b.status !== "Cancelled" && b.status !== "Completed" && (
                    <button disabled={actionLoading===b._id} onClick={() => cancelBooking(b._id)} className="px-3 py-2 rounded-md bg-rose-500 text-white text-sm disabled:opacity-50">{actionLoading===b._id? 'Cancelling...' : 'Cancel'}</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <BookingDetailModal open={detailOpen} onClose={closeDetail} booking={selectedBooking} />
    </div>
  );
};

export default Bookings;