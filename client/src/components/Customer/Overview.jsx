import React from "react";

const Overview = () => {
  // Placeholder/mock data - replace with real data from props or context
  const stats = [
    { id: 1, label: "Upcoming Bookings", value: 3 },
    { id: 2, label: "Total Events", value: 12 },
    { id: 3, label: "Messages", value: 5 },
  ];

  const recent = [
    { id: 1, title: "Smith Wedding", date: "2025-09-14", status: "Confirmed" },
    { id: 2, title: "Corporate Meetup", date: "2025-10-02", status: "Pending" },
    { id: 3, title: "Birthday Bash", date: "2025-11-05", status: "Cancelled" },
  ];

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="col-span-1 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center gap-4">
            <img
              src="https://placehold.co/80x80?text=U"
              alt="User avatar"
              className="h-20 w-20 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-sm text-gray-500">Member since 2024</p>
              <p className="mt-2 text-sm text-gray-700">johndoe@example.com</p>
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
            {stats.map((s) => (
              <div key={s.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="mt-2 text-2xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Bookings</h3>
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                View all
              </a>
            </div>

            <ul className="mt-4 divide-y">
              {recent.map((r) => (
                <li key={r.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{r.title}</p>
                    <p className="text-sm text-gray-500">{r.date}</p>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        r.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-700"
                          : r.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;