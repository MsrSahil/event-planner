import React from "react";

const Services = () => {
  return (
    <section className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-lg">Venue Sourcing</h3>
          <p className="text-sm text-gray-600">We connect you with the perfect hall or outdoor location matching your vision and budget.</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-lg">Catering & Menu</h3>
          <p className="text-sm text-gray-600">Custom menus, live stations and professional service for any guest count.</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-lg">Decor & Styling</h3>
          <p className="text-sm text-gray-600">Bespoke decor packages tailored to your theme and preferences.</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-lg">Full Event Management</h3>
          <p className="text-sm text-gray-600">End-to-end coordination so you can relax while we handle the details.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
