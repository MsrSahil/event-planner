import React, { useState } from "react";
import api from "../config/api";
import { toast } from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // optional: UX improvement

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.phone
    ) {
      toast.error("Please enter all the fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/contactUs/submit", formData);
      toast.success(res.data.message || "Message sent successfully");
      console.log("📩 Contact form submitted:", formData);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error(
        `Error ${error.response?.status || ""}: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-[-10%] bg-gradient-to-b from-[#ffe4ec] to-[#ffd6e8] flex items-center justify-center px-4 py-12">
      <div className="bg-white mt-[7%] rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-semibold text-pink-600 mb-6 text-center">
          Let's Plan Your Next Event 🎉
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              name="email"
              className="w-full px-4 py-2 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Phone</label>
            <input
              type="tel"
              placeholder="9456678956"
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              className="w-full px-4 py-2 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Message</label>
            <textarea
              rows="4"
              placeholder="Tell us about your event..."
              value={formData.message}
              onChange={handleChange}
              name="message"
              className="w-full px-4 py-2 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "opacity-60 cursor-not-allowed" : ""
              } bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-full transition duration-300`}
            >
              {loading ? "Sending..." : "Send Message 💌"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
