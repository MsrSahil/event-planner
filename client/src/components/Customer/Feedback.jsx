import React, { useState } from "react";

const Feedback = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: "",
    comments: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Valid email required.";
    if (!form.rating) nextErrors.rating = "Please select a rating.";
    if (!form.comments.trim()) nextErrors.comments = "Please enter your feedback.";
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuccess("Thank you for your feedback!");
      setForm({ name: "", email: "", rating: "", comments: "" });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Share Your Feedback
        </h1>
        <p className="text-gray-600 text-center mb-8">
          We value your experience! Please let us know how we did and how we can improve.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300"
              placeholder="Your name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num} className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={num}
                    checked={form.rating === String(num)}
                    onChange={handleChange}
                    className="accent-indigo-600 w-5 h-5"
                  />
                  <span className="text-xs mt-1 text-gray-600">{num}</span>
                </label>
              ))}
            </div>
            {errors.rating && <p className="text-sm text-red-500 mt-1">{errors.rating}</p>}
          </div>

          <div>
            <label htmlFor="comments" className="block text-sm font-semibold text-gray-700 mb-2">
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              rows="5"
              value={form.comments}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 resize-none"
              placeholder="Share your thoughts..."
            />
            {errors.comments && <p className="text-sm text-red-500 mt-1">{errors.comments}</p>}
          </div>

          {success && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-center">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;