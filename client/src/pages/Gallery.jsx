import React from "react";

const Gallery = () => {
  const placeholders = new Array(8).fill(0);
  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
      <p className="text-gray-700 mb-6">A selection of our recent events and setups. Click to enlarge (placeholder images).</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {placeholders.map((_, idx) => (
          <div key={idx} className="bg-gray-100 rounded overflow-hidden h-40 flex items-center justify-center text-gray-400">Image {idx + 1}</div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
