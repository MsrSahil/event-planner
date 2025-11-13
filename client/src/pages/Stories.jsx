import React from "react";
import Testimonials from "../components/Testimonials";

const Stories = () => {
  return (
    <>
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-6">Client Stories</h1>

        <div className="space-y-6">
          <article className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">A Dream Wedding at Royal Gardens</h3>
            <p className="text-sm text-gray-600 mt-2">We helped the couple create an intimate garden wedding with custom decor and a live acoustic set — 200 guests, zero stress.</p>
          </article>

          <article className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">Corporate Year-End Gala</h3>
            <p className="text-sm text-gray-600 mt-2">A themed gala with stage production, catering and on-site coordination for 800 attendees.</p>
          </article>
        </div>
      </section>

      <Testimonials />
    </>
  );
};

export default Stories;
