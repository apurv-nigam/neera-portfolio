import { useState } from "react";
import { getAllGalleryArtworks } from "../../data/artworks";
import FilterBar from "../gallery/FilterBar";
import ImageCard from "../gallery/ImageCard";
import ImageModal from "../gallery/ImageModal";
import AnimateOnScroll from "../ui/AnimateOnScroll";

const allArtworks = getAllGalleryArtworks();

const GallerySection = () => {
  const [filter, setFilter] = useState("all");
  const [modalIndex, setModalIndex] = useState(null);

  const filtered =
    filter === "all"
      ? allArtworks
      : allArtworks.filter((a) => a.category === filter);

  return (
    <section id="gallery" className="py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-warm-gray-800">
              Gallery
            </h2>
            <div className="w-12 h-px bg-accent mx-auto mt-4 mb-6" />
            <p className="text-warm-gray-500 max-w-xl mx-auto">
              A collection of oil paintings and watercolors celebrating life,
              nature, and emotion.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <div className="mb-10">
            <FilterBar active={filter} onChange={setFilter} />
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((artwork, i) => (
            <ImageCard
              key={artwork.url}
              artwork={artwork}
              index={i}
              onClick={() => setModalIndex(i)}
            />
          ))}
        </div>
      </div>

      {modalIndex !== null && (
        <ImageModal
          images={filtered}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
        />
      )}
    </section>
  );
};

export default GallerySection;
