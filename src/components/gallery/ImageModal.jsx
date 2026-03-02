import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useSwipe } from "../../hooks/useSwipe";

const ImageModal = ({ images, currentIndex, onClose }) => {
  const [index, setIndex] = useState(currentIndex);
  const [visible, setVisible] = useState(false);

  const image = images[index];

  const goNext = () => setIndex((i) => (i + 1) % images.length);
  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  const swipeHandlers = useSwipe(goNext, goPrev);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKey);
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdrop}
    >
      <div
        className={`bg-white rounded-2xl w-full max-w-6xl overflow-hidden relative flex flex-col max-h-[95vh] transition-transform duration-300 ${
          visible ? "scale-100" : "scale-95"
        }`}
        {...swipeHandlers}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg hover:bg-warm-gray-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-warm-gray-800" />
        </button>

        {/* Image Container */}
        <div className="w-full h-[65vh] md:h-[75vh] relative bg-warm-gray-100">
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-contain"
          />

          {/* Navigation Arrows — always visible on mobile */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 md:px-4">
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="p-2 md:p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="p-2 md:p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
              aria-label="Next image"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1.5 rounded-full text-sm">
            {index + 1} / {images.length}
          </div>
        </div>

        {/* Info */}
        <div className="p-5 md:p-6 bg-white flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-warm-gray-800">
                {image.title}
              </h3>
              <p className="text-warm-gray-500 mt-1 text-sm md:text-base">
                {image.description}
              </p>
            </div>
            <span className="text-sm font-medium text-warm-gray-600 shrink-0">
              {image.year}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm pt-3 text-warm-gray-500">
            <span>
              <span className="text-warm-gray-400">Medium:</span>{" "}
              <span className="text-warm-gray-700 font-medium">{image.medium}</span>
            </span>
            <span>
              <span className="text-warm-gray-400">Size:</span>{" "}
              <span className="text-warm-gray-700 font-medium">{image.size}</span>
            </span>
            <span>
              <span className="text-warm-gray-400">Surface:</span>{" "}
              <span className="text-warm-gray-700 font-medium">{image.surface}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
