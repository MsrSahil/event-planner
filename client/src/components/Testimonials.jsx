import React from "react";
import TestimonialCard from "./TestimonialCard";

const SAMPLE = [
  { name: "Anita & Rohit", role: "Bride & Groom", quote: "Festive Flair made our day magical — seamless planning and gorgeous decor.", avatar: "https://placehold.co/64x64?text=A" },
  { name: "TechCorp Events", role: "HR Lead", quote: "A flawless corporate gala with excellent logistics and timely delivery.", avatar: "https://placehold.co/64x64?text=T" },
  { name: "Sana", role: "Event Host", quote: "Highly professional team. The catering was exceptional.", avatar: "https://placehold.co/64x64?text=S" },
];

const Testimonials = ({ items = SAMPLE }) => {
  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold mb-6">What our clients say</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
