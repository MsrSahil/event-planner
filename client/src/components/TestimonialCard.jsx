import React from "react";

const TestimonialCard = ({ name, role, quote, avatar }) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <img src={avatar || "https://placehold.co/48x48?text=U"} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
      <blockquote className="text-gray-700">“{quote}”</blockquote>
    </div>
  );
};

export default TestimonialCard;
