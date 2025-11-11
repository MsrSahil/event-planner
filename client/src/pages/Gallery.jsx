import React, { useState, useCallback, useEffect } from "react";

// Simple gallery using picsum as placeholder images. Replace src with your assets later.
const IMAGES = Array.from({ length: 16 }).map((_, i) => {
  // categories to allow filtering
  const categories = ["Weddings", "Corporate", "Decor", "Ceremony"];
  const category = categories[i % categories.length];
  return {
    id: `img-${i + 1}`,
    src: `https://picsum.photos/seed/event-${i + 1}/1200/800`,
    thumb: `https://picsum.photos/seed/event-${i + 1}/600/400`,
    alt: `${category} image ${i + 1}`,
    caption: `${category} — Photo ${i + 1}`,
    category,
  };
});

const categories = ["All", "Weddings", "Corporate", "Decor", "Ceremony"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [items, setItems] = useState(IMAGES);
  const [visibleCount, setVisibleCount] = useState(8);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = items.filter((it) => activeCategory === "All" || it.category === activeCategory);
  const visible = filtered.slice(0, visibleCount);

  const openLightbox = (indexInVisible) => {
    const globalIndex = items.indexOf(visible[indexInVisible]);
    setActiveIndex(globalIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const showPrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const onKey = useCallback((e) => {
    if (!lightboxOpen) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  }, [lightboxOpen]);

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="text-gray-600 mt-1">A selection of our recent events. Click any image to open a larger view.</p>
        </div>

        <div className="flex items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setActiveCategory(c); setVisibleCount(8); }}
              className={`px-3 py-1 rounded-full text-sm font-medium ${activeCategory === c ? 'bg-emerald-600 text-white' : 'bg-white/10 text-white/90 hover:bg-white/20'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {visible.map((img, idx) => (
          <button key={img.id} onClick={() => openLightbox(idx)} className="group block overflow-hidden rounded-lg">
            <div className="relative h-40 sm:h-48 md:h-44 lg:h-52 bg-gray-100">
              <img src={img.thumb} alt={img.alt} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300" />
              <div className="absolute left-0 bottom-0 right-0 bg-gradient-to-t from-black/50 to-transparent text-white p-2 text-sm">{img.caption}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center">
        {visibleCount < filtered.length ? (
          <button onClick={() => setVisibleCount((v) => v + 8)} className="px-4 py-2 rounded-md bg-emerald-600 text-white">Load more</button>
        ) : (
          filtered.length > 0 && <div className="text-sm text-gray-500">Showing all {filtered.length} items</div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={closeLightbox} />

          <div className="relative max-w-4xl w-full mx-auto">
            <button onClick={closeLightbox} className="absolute right-2 top-2 z-20 bg-white/10 text-white rounded-full p-2">✕</button>

            <div className="bg-black rounded-lg overflow-hidden">
              <div className="relative">
                <img src={items[activeIndex].src} alt={items[activeIndex].alt} className="w-full max-h-[80vh] object-contain bg-black" />
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  <button onClick={showPrev} className="bg-white/10 text-white rounded-full p-2">◀</button>
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <button onClick={showNext} className="bg-white/10 text-white rounded-full p-2">▶</button>
                </div>
              </div>

              <div className="p-4 bg-black text-white/90">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{items[activeIndex].caption}</div>
                    <div className="text-sm text-white/70">Category: {items[activeIndex].category}</div>
                  </div>
                  <div className="text-sm text-white/60">{activeIndex + 1} / {items.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
