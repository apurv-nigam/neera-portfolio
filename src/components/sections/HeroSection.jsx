import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useArtworks } from "../../hooks/useArtworks";
import { getFeaturedArtworks } from "../../data/artworks";

const staticFeatured = getFeaturedArtworks();

const HeroSection = () => {
  const { artworks: dbFeatured, loading } = useArtworks("featured");
  const featured = dbFeatured.length > 0 ? dbFeatured : staticFeatured;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (featured.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featured.length]);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Slideshow */}
      {featured.map((artwork, i) => (
        <div
          key={artwork.url || artwork.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={artwork.url}
            alt={artwork.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Loading placeholder */}
      {loading && featured.length === 0 && (
        <div className="absolute inset-0 bg-warm-gray-800" />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <div className="animate-fadeIn">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            Neera Nigam
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80 font-light tracking-wide max-w-xl mx-auto">
            Capturing life's beautiful moments through oil colors &amp; watercolors
          </p>
          <div className="w-16 h-px bg-gold mx-auto mt-8" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#gallery"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll to gallery"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
};

export default HeroSection;
