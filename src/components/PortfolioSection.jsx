import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

const ImageModal = ({
  image,
  onClose,
  images,
  currentIndex,
  onNext,
  onPrevious,
}) => {
  if (!image) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-6xl overflow-hidden relative flex flex-col max-h-[95vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors z-10 flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-800" />
        </button>

        {/* Fixed Height Image Container with Navigation */}
        <div className="w-full h-[75vh] relative bg-gray-100">
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-contain"
          />

          {/* Navigation Arrows */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors transform hover:scale-110"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors transform hover:scale-110"
              aria-label="Next image"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Information Section - Always Visible */}
        <div className="p-6 bg-white flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold">
                {image.title || "Untitled"}
              </h3>
              <p className="text-gray-600 mt-1">
                {image.description || "No description available"}
              </p>
            </div>
            <div className="text-right text-sm shrink-0">
              <p className="text-gray-900 font-medium">{image.year || "N/A"}</p>
            </div>
          </div>

          {/* Technical Details in a Row */}
          <div className="flex flex-wrap gap-4 text-sm pt-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Medium:</span>
              <span className="text-gray-900 font-medium">
                {image.medium || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Size:</span>
              <span className="text-gray-900 font-medium">
                {image.size || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Surface:</span>
              <span className="text-gray-900 font-medium">
                {image.surface || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection = ({
  align,
  title,
  description,
  additionalContent,
  images,
  id,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const openImageModal = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  // Handle modal navigation
  const handleModalNext = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const handleModalPrevious = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  return (
    <>
      <section
        id={id}
        className="min-h-screen flex items-center py-24 px-6 md:px-12 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black" />
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${
              align === "right" ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Text Content */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                  {title}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                  {description}
                </p>
                {additionalContent && (
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mt-4">
                    {additionalContent}
                  </p>
                )}
              </div>
            </div>

            {/* Image Gallery */}
            <div
              className={`relative ${
                align === "right" ? "lg:order-first" : ""
              }`}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group bg-gray-100">
                {/* Main Image */}
                <div className="absolute inset-0">
                  {images.map((image, index) => (
                    <div
                      key={image.url}
                      className={`absolute inset-0 transition-all duration-700 ${
                        index === currentImageIndex
                          ? "opacity-100 scale-100 z-10"
                          : "opacity-0 scale-110"
                      }`}
                    >
                      <button
                        onClick={() => openImageModal(image, index)}
                        className="w-full h-full focus:outline-none"
                        aria-label={`Open ${image.title} details`}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <img
                            src={image.url}
                            alt={image.title}
                            className="max-w-full max-h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={previousImage}
                    className="p-3 rounded-full bg-white/90 hover:bg-white transition-colors transform hover:scale-110 z-20"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="p-3 rounded-full bg-white/90 hover:bg-white transition-colors transform hover:scale-110 z-20"
                    aria-label="Next image"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-black scale-125"
                        : "bg-black/20 hover:bg-black/40"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          images={images}
          currentIndex={currentImageIndex}
          onNext={handleModalNext}
          onPrevious={handleModalPrevious}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

export default PortfolioSection;
