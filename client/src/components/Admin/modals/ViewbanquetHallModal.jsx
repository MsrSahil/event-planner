import React from "react";

const ViewbanquetHallModal = ({ isOpen, onClose, CurrentBanquetHall }) => {
  if (!isOpen || !CurrentBanquetHall) return null;

  const {
    hallName,
    address,
    capacity,
    managerName,
    photos = [],
    contactNumber,
    email,
    rent,
    minBookingAmount,
    featureDescription,
    createdAt,
    status,
  } = CurrentBanquetHall;

  return (
    <div className="fixed inset-0 top-20 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto scrollbar-hide"
        //onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b-2 border-gray-100 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl sticky top-0">
          <h2 className="text-2xl font-bold text-white flex-1">{hallName}</h2>
          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold border-2 ${
              status === "Active"
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-red-100 text-red-700 border-red-300"
            }`}
          >
            {status}
          </span>
          <button
            onClick={onClose}
            className="ml-4 text-white/80 hover:text-white text-3xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Images */}
        {photos.length > 0 && (
          <div className="flex gap-3 overflow-x-auto m-4 bg-gray-50">
            {photos.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Banquet Hall ${idx + 1}`}
                className="h-34 w-34 object-cover rounded-lg border shadow"
              />
            ))}
          </div>
        )}

        {/* Details */}
        <div className="p-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <span className="block text-gray-500 text-sm font-medium">
                Address
              </span>
              <span className="text-gray-900 font-semibold">{address}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm font-medium">
                Capacity
              </span>
              <span className="text-gray-900 font-semibold">{capacity}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm font-medium">
                Manager
              </span>
              <span className="text-gray-900 font-semibold">{managerName}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm font-medium">
                Contact Number
              </span>
              <span className="text-gray-900 font-semibold">
                {contactNumber}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <span className="block text-gray-500 text-sm font-medium">
                Rent
              </span>
              <span className="text-gray-900 font-semibold">₹{rent}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm font-medium">
                Min. Booking Amount
              </span>
              <span className="text-gray-900 font-semibold">
                ₹{minBookingAmount}
              </span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm font-medium">
                Organizing Since
              </span>
              <span className="text-gray-900 font-semibold">
                {new Date(createdAt).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm font-medium">
                Email
              </span>
              <span className="text-gray-900 font-semibold">{email}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="px-6 pb-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 mt-2">
            <span className="block text-blue-700 font-semibold mb-1">
              Features & Description
            </span>
            <span className="text-gray-800">{featureDescription}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewbanquetHallModal;
