import React from "react";

const ServiceCard = ({ title, price, description, features = [], ctaLabel = "Enquire" }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-right">
          <div className="text-sm text-gray-500">Starting at</div>
          <div className="text-xl font-bold">{price ? `₹${price}` : "Custom"}</div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <ul className="text-sm text-gray-700 space-y-1 mb-6 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-emerald-600 mt-1">•</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <button className="w-full px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">{ctaLabel}</button>
      </div>
    </div>
  );
};

export default ServiceCard;
