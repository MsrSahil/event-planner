import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaComments, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../config/api";

const Support = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.subject.trim()) errs.subject = "Subject is required.";
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = "Message must be at least 10 characters.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    const next = validate();
    if (Object.keys(next).length) return setErrors(next);
    (async () => {
      setLoading(true);
      try {
        const res = await api.post("/public/contactus", form);
        const message = res?.data?.message || "Support request submitted. We'll get back to you within 24 hours.";
        setSuccess(message);
        toast.success(message);
        setForm({ name: "", email: "", subject: "", message: "" });
      } catch (err) {
        const msg = err.response?.data?.message || err.message || "Failed to submit support request.";
        toast.error(msg);
        setErrors({ form: msg });
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Customer Support</h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Need help? Contact our support team via phone, email or send us a message below.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600"><FaPhone /></div>
                <div>
                  <h3 className="font-semibold">Phone Support</h3>
                  <p className="text-sm text-gray-600">Mon - Fri, 9am - 6pm</p>
                  <a href="tel:+15551234567" className="mt-2 block text-indigo-600 font-medium">+1 (555) 123-4567</a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600"><FaEnvelope /></div>
                <div>
                  <h3 className="font-semibold">Email Support</h3>
                  <p className="text-sm text-gray-600">For invoices, bookings and general queries</p>
                  <a href="mailto:info@eventplanner.com" className="mt-2 block text-indigo-600 font-medium">info@eventplanner.com</a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600"><FaComments /></div>
                <div>
                  <h3 className="font-semibold">Live Chat</h3>
                  <p className="text-sm text-gray-600">Click the chat icon at bottom right to start a conversation.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-2">Send us a message</h2>
            <p className="text-sm text-gray-600 mb-6">Describe your issue and our team will respond as soon as possible.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                  <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                  {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={6} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none" />
                {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
              </div>

              {success && <div className="p-3 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700">{success}</div>}

              <div className="flex items-center gap-3">
                <button type="submit" disabled={loading} className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                  {loading ? "Sending..." : "Submit Request"}
                </button>
                <div className="text-sm text-gray-500 flex items-center gap-2"><FaClock /> Typical response: 24 hours</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;