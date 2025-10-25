import React, { useEffect } from "react";

const BookingDetailModal = ({ open, onClose, booking }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-lg shadow-lg p-6 z-10">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Booking Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Close</button>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <div className="text-sm text-gray-500">Booking ID</div>
            <div className="font-mono text-sm text-gray-700">{booking?._id || "-"}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Title</div>
            <div className="text-gray-800 font-medium">{booking?.hallName || booking?.title || "Booking"}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Date</div>
            <div className="text-gray-700">{booking?.date ? new Date(booking.date).toLocaleString() : booking?.bookingDate ? new Date(booking.bookingDate).toLocaleString() : booking?.createdAt ? new Date(booking.createdAt).toLocaleString() : "-"}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Amount</div>
            <div className="text-gray-800">{booking?.amount ? `₹${booking.amount}` : booking?.price ? `₹${booking.price}` : "-"}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Status</div>
            <div className="text-gray-800 font-medium">{booking?.status || "Unknown"}</div>
          </div>

          {booking?.notes && (
            <div>
              <div className="text-sm text-gray-500">Notes</div>
              <div className="text-gray-700">{booking.notes}</div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md border hover:bg-gray-50">Close</button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;
