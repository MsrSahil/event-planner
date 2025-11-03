import React, { useState } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";

const BookingCreateModal = ({ open, onClose, onCreated }) => {
  const [hallName, setHallName] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (!hallName || !date) return toast.error("Please provide hall name and date");
    setLoading(true);
    try {
      const res = await api.post("/user/bookings", { hallName, title, date, amount, notes });
      toast.success(res.data?.message || "Booking created");
      onCreated && onCreated(res.data.data);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <form className="relative bg-white w-full max-w-lg mx-4 rounded-lg shadow-lg p-6 z-10" onSubmit={submit}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Create Booking</h3>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">Close</button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3">
          <div>
            <label className="text-sm text-gray-600">Hall / Venue</label>
            <input value={hallName} onChange={(e) => setHallName(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" placeholder="Hall name" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Title (optional)</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" placeholder="Event title" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Date & time</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} type="datetime-local" className="w-full border px-3 py-2 rounded mt-1" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Amount (optional)</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="w-full border px-3 py-2 rounded mt-1" placeholder="Amount in INR" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" rows={3} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-emerald-600 text-white">{loading? 'Creating...' : 'Create Booking'}</button>
        </div>
      </form>
    </div>
  );
};

export default BookingCreateModal;
