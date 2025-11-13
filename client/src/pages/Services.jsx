import React from "react";
import ServiceCard from "../components/ServiceCard";
import Testimonials from "../components/Testimonials";

const SERVICES = [
  {
    title: "Venue Sourcing",
    price: 15000,
    description: "Find the perfect venue to match your theme and guest list.",
    features: ["Multiple venue options", "Site visits", "Negotiation & booking"],
  },
  {
    title: "Catering & Menu",
    price: 50000,
    description: "Custom menus with tasting sessions and full service staffing.",
    features: ["Custom menus", "Live stations", "Dietary options"],
  },
  {
    title: "Decor & Styling",
    price: 25000,
    description: "Bespoke decor packages for every style and budget.",
    features: ["Theme design", "Floral arrangements", "Lighting & props"],
  },
  {
    title: "Full Event Management",
    price: 80000,
    description: "End-to-end planning, vendor coordination and on-site management.",
    features: ["Detailed timeline", "Vendor management", "On-day coordination"],
  },
];

const Services = () => {
  return (
    <>
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4">Our Services</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </div>
      </section>

      <Testimonials />
    </>
  );
};

export default Services;

