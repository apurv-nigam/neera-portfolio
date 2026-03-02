import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, X, ChevronUp, Share2, Check } from "lucide-react";
import { useSwipe } from "../../hooks/useSwipe";

const PEEK_HEIGHT = 72;
const EXPANDED_HEIGHT = 280;
const DRAG_THRESHOLD = 40;

const ImageModal = ({ images, currentIndex, initialInnerSlide = 0, onClose }) => {
  const [index, setIndex] = useState(currentIndex);
  const [visible, setVisible] = useState(false);
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [shareConfirm, setShareConfirm] = useState(false);

  // Inner carousel: 0 = artwork, 1 = original
  const [innerSlide, setInnerSlide] = useState(initialInnerSlide);

  // Bottom sheet drag state
  const sheetRef = useRef(null);
  const dragStartY = useRef(null);
  const dragCurrentY = useRef(null);
  const isDraggingSheet = useRef(false);

  const image = images[index];
  const hasOriginal = !!image.originalUrl;
  const isSingleArtwork = images.length === 1;

  // Reset inner slide when changing artwork
  useEffect(() => {
    setInnerSlide(0);
  }, [index]);

  const goNext = () => { setIndex((i) => (i + 1) % images.length); setSheetExpanded(false); };
  const goPrev = () => { setIndex((i) => (i - 1 + images.length) % images.length); setSheetExpanded(false); };

  // Swipe handler: if artwork has original, swipe toggles inner carousel first
  const handleSwipeLeft = () => {
    if (hasOriginal && innerSlide === 0) {
      setInnerSlide(1);
    } else if (!isSingleArtwork) {
      goNext();
    }
  };

  const handleSwipeRight = () => {
    if (hasOriginal && innerSlide === 1) {
      setInnerSlide(0);
    } else if (!isSingleArtwork) {
      goPrev();
    }
  };

  const swipeHandlers = useSwipe(handleSwipeLeft, handleSwipeRight);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handleSwipeRight();
      if (e.key === "ArrowRight") handleSwipeLeft();
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
  }, [onClose, hasOriginal, innerSlide]);

  // Share handler
  const handleShare = async (e) => {
    e.stopPropagation();
    const artworkId = image.id;
    if (!artworkId) return;

    const viewParam = innerSlide === 1 ? '?view=original' : '';
    const shareUrl = `${window.location.origin}/artwork/${artworkId}${viewParam}`;
    const shareData = {
      title: image.title,
      text: `Check out "${image.title}" by Neera Nigam`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShareConfirm(true);
        setTimeout(() => setShareConfirm(false), 2000);
      }
    } catch (err) {
      // User cancelled share or clipboard failed — ignore
      if (err.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(shareUrl);
          setShareConfirm(true);
          setTimeout(() => setShareConfirm(false), 2000);
        } catch {
          // silently fail
        }
      }
    }
  };

  // Bottom sheet touch handlers
  const onSheetTouchStart = useCallback((e) => {
    if (e.touches.length > 1) return;
    e.stopPropagation();
    isDraggingSheet.current = true;
    dragStartY.current = e.touches[0].clientY;
    dragCurrentY.current = null;
  }, []);

  const onSheetTouchMove = useCallback((e) => {
    if (!isDraggingSheet.current || e.touches.length > 1) return;
    e.stopPropagation();
    dragCurrentY.current = e.touches[0].clientY;
  }, []);

  const onSheetTouchEnd = useCallback((e) => {
    if (!isDraggingSheet.current) return;
    e.stopPropagation();
    if (dragStartY.current !== null && dragCurrentY.current !== null) {
      const delta = dragStartY.current - dragCurrentY.current;
      if (delta > DRAG_THRESHOLD) {
        setSheetExpanded(true);
      } else if (delta < -DRAG_THRESHOLD) {
        setSheetExpanded(false);
      }
    }
    isDraggingSheet.current = false;
    dragStartY.current = null;
    dragCurrentY.current = null;
  }, []);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const currentImageUrl = innerSlide === 0 ? image.url : image.originalUrl;
  const currentLabel = innerSlide === 0 ? "Artwork" : "Original";

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdrop}
    >
      {/* Desktop backdrop */}
      <div className="hidden md:block absolute inset-0 bg-black/70" onClick={handleBackdrop} />

      <div className="md:absolute md:inset-0 md:flex md:items-center md:justify-center md:p-4 h-full md:h-auto">
        <div
          className={`
            relative flex flex-col h-full w-full bg-black
            md:bg-white md:rounded-2xl md:max-w-6xl md:max-h-[95vh] md:overflow-hidden
            transition-transform duration-300 ${visible ? "scale-100" : "scale-95"}
          `}
          {...swipeHandlers}
        >
          {/* Top buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            {image.id && (
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-black/50 md:bg-white md:shadow-lg hover:bg-black/70 md:hover:bg-warm-gray-100 transition-colors"
                aria-label="Share artwork"
              >
                {shareConfirm ? (
                  <Check className="w-5 h-5 text-green-400 md:text-green-500" />
                ) : (
                  <Share2 className="w-5 h-5 text-white md:text-warm-gray-800" />
                )}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/50 md:bg-white md:shadow-lg hover:bg-black/70 md:hover:bg-warm-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-white md:text-warm-gray-800" />
            </button>
          </div>

          {/* Image Container */}
          <div className="flex-1 relative flex items-center justify-center md:h-[75vh] md:flex-none bg-black md:bg-warm-gray-100">
            <img
              src={currentImageUrl}
              alt={`${image.title} - ${currentLabel}`}
              className="max-w-full max-h-full object-contain transition-opacity duration-300"
            />

            {/* Inner carousel label */}
            {hasOriginal && (
              <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium z-10">
                {currentLabel}
              </div>
            )}

            {/* Dot indicators for inner carousel */}
            {hasOriginal && (
              <div className="absolute bottom-28 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                <button
                  onClick={(e) => { e.stopPropagation(); setInnerSlide(0); }}
                  className={`h-2 rounded-full transition-all ${
                    innerSlide === 0 ? "bg-white w-6" : "bg-white/50 w-2"
                  }`}
                  aria-label="Show artwork"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setInnerSlide(1); }}
                  className={`h-2 rounded-full transition-all ${
                    innerSlide === 1 ? "bg-white w-6" : "bg-white/50 w-2"
                  }`}
                  aria-label="Show original"
                />
              </div>
            )}

            {/* Navigation Arrows */}
            {!isSingleArtwork && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 md:px-4">
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="p-2 md:p-3 rounded-full bg-black/40 md:bg-white/90 hover:bg-black/60 md:hover:bg-white shadow-lg transition-all"
                  aria-label="Previous image"
                >
                  <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white md:text-warm-gray-800" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="p-2 md:p-3 rounded-full bg-black/40 md:bg-white/90 hover:bg-black/60 md:hover:bg-white shadow-lg transition-all"
                  aria-label="Next image"
                >
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white md:text-warm-gray-800" />
                </button>
              </div>
            )}

            {/* Image Counter */}
            {!isSingleArtwork && (
              <div className="absolute bottom-20 md:bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1.5 rounded-full text-sm z-10">
                {index + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Mobile Bottom Sheet */}
          <div
            ref={sheetRef}
            className="md:hidden absolute bottom-0 left-0 right-0 z-30 bg-cream rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out"
            style={{ height: sheetExpanded ? EXPANDED_HEIGHT : PEEK_HEIGHT }}
            onTouchStart={onSheetTouchStart}
            onTouchMove={onSheetTouchMove}
            onTouchEnd={onSheetTouchEnd}
          >
            {/* Drag Handle */}
            <div
              className="flex justify-center pt-2 pb-1 cursor-grab"
              onClick={() => setSheetExpanded(!sheetExpanded)}
            >
              <div className="w-10 h-1 rounded-full bg-warm-gray-300" />
            </div>

            {/* Peek Content — always visible */}
            <div className="px-5 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-base font-bold text-warm-gray-800 truncate">
                  {image.title}
                </h3>
                <p className="text-xs text-warm-gray-500">{image.medium} &middot; {image.year}</p>
              </div>
              <button
                onClick={() => setSheetExpanded(!sheetExpanded)}
                className="p-1 shrink-0 ml-2"
                aria-label={sheetExpanded ? "Collapse details" : "Expand details"}
              >
                <ChevronUp
                  className={`w-5 h-5 text-warm-gray-400 transition-transform duration-300 ${
                    sheetExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Expanded Content */}
            <div
              className={`px-5 pt-3 overflow-hidden transition-opacity duration-300 ${
                sheetExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-sm text-warm-gray-600 leading-relaxed">
                {image.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <span className="text-xs text-warm-gray-400 uppercase tracking-wider">Medium</span>
                  <p className="text-sm font-medium text-warm-gray-700">{image.medium}</p>
                </div>
                <div>
                  <span className="text-xs text-warm-gray-400 uppercase tracking-wider">Size</span>
                  <p className="text-sm font-medium text-warm-gray-700">{image.size}</p>
                </div>
                <div>
                  <span className="text-xs text-warm-gray-400 uppercase tracking-wider">Surface</span>
                  <p className="text-sm font-medium text-warm-gray-700">{image.surface}</p>
                </div>
                <div>
                  <span className="text-xs text-warm-gray-400 uppercase tracking-wider">Year</span>
                  <p className="text-sm font-medium text-warm-gray-700">{image.year}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Info Panel */}
          <div className="hidden md:block p-5 md:p-6 bg-white flex-shrink-0">
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
    </div>
  );
};

export default ImageModal;
