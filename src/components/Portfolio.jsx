import PortfolioSection from "./PortfolioSection.jsx";

const Portfolio = () => {
  const sections = [
    {
      id: "home",
      title: "Capturing Life's Beautiful Moments",
      description:
        "Welcome to my artistic journey where each stroke tells a story of joy, emotion, and life's precious moments. Through oil colors and watercolors, I bring visions to life with a touch of realism and a heart full of passion.",
      images: [
        {
          url: "/images/home1.jpg",
          title: "Joy in Colors",
          description:
            "An exploration of happiness through vibrant oil colors.",
          medium: "Oil Colors",
          size: "24x36 inches",
          surface: "Canvas",
          year: "2023",
        },
        {
          url: "/images/home2.jpg",
          title: "Nature's Harmony",
          description:
            "A watercolor piece showcasing the beauty of natural landscapes.",
          medium: "Watercolor",
          size: "18x24 inches",
          surface: "Watercolor Paper",
          year: "2023",
        },
        {
          url: "/images/home3.jpg",
          title: "Emotional Depths",
          description: "A realistic portrayal of human emotions through art.",
          medium: "Oil Colors",
          size: "30x40 inches",
          surface: "Canvas",
          year: "2023",
        },
      ],
      align: "left",
    },
    {
      id: "about",
      title: "About Me",
      description:
        "Hello! I'm Neera Nigam, an artist with a fine arts degree from Lucknow Arts College. Specializing in realistic drawings, I find joy in portraying the beauty of life through my artwork. Happiness is a recurring theme in my paintings, as I aim to capture and convey positive emotions.",
      additionalContent:
        "My preferred mediums are oil colors and watercolors, each lending a unique touch to my creations. Inspired by nature and emotions, I believe art has the power to transcend boundaries. With a foundation in fine arts, I've showcased my work in various exhibitions and collaborated with fellow artists. Always open to new creative ventures, I invite you to explore the world of art with me. Let's create something beautiful together!",
      images: [
        {
          url: "/images/about1.jpg",
          title: "Studio Life",
          description:
            "A glimpse into my creative space where art comes to life.",
          medium: "Photography",
          size: "Digital",
          surface: "N/A",
          year: "2023",
        },
        {
          url: "/images/about2.jpg",
          title: "Exhibition Moments",
          description:
            "Sharing my artwork with art enthusiasts at exhibitions.",
          medium: "Photography",
          size: "Digital",
          surface: "N/A",
          year: "2023",
        },
        {
          url: "/images/about3.jpg",
          title: "Creative Process",
          description: "Capturing moments of inspiration and creation.",
          medium: "Photography",
          size: "Digital",
          surface: "N/A",
          year: "2023",
        },
      ],
      align: "right",
    },
    {
      id: "oil-paintings",
      title: "Oil Paintings",
      description:
        "My oil paintings are a celebration of life's vibrant moments. Each piece is carefully crafted to capture depth, emotion, and the intricate play of light and shadow.",
      images: [
        {
          url: "/images/oil1.jpg",
          title: "Vibrant Expressions",
          description: "A study of color and emotion through oil painting.",
          medium: "Oil Colors",
          size: "24x36 inches",
          surface: "Canvas",
          year: "2023",
        },
        {
          url: "/images/oil2.jpg",
          title: "Nature's Poetry",
          description: "Landscape painting exploring natural beauty.",
          medium: "Oil Colors",
          size: "30x40 inches",
          surface: "Canvas",
          year: "2023",
        },
        {
          url: "/images/oil3.jpg",
          title: "Portrait Stories",
          description: "Realistic portrait capturing human essence.",
          medium: "Oil Colors",
          size: "20x24 inches",
          surface: "Canvas",
          year: "2023",
        },
      ],
      align: "left",
    },
    {
      id: "watercolors",
      title: "Watercolor Collection",
      description:
        "My watercolor pieces showcase the delicate balance between control and spontaneity. Each painting tells a story through transparent layers and flowing colors.",
      images: [
        {
          url: "/images/water1.jpg",
          title: "Fluid Grace",
          description: "Abstract watercolor exploring movement and flow.",
          medium: "Watercolor",
          size: "18x24 inches",
          surface: "Watercolor Paper",
          year: "2023",
        },
        {
          url: "/images/water2.jpg",
          title: "Morning Light",
          description: "Landscape capturing the essence of dawn.",
          medium: "Watercolor",
          size: "16x20 inches",
          surface: "Watercolor Paper",
          year: "2023",
        },
        {
          url: "/images/water3.jpg",
          title: "Urban Sketches",
          description: "City scenes brought to life with watercolors.",
          medium: "Watercolor",
          size: "14x18 inches",
          surface: "Watercolor Paper",
          year: "2023",
        },
      ],
      align: "right",
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative bg-white">
      {/* Fixed Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold">Neera Nigam</div>
            <div className="hidden md:flex space-x-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {section.id
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with Padding for Fixed Header */}
      <div className="pt-16">
        {sections.map((section, index) => (
          <div key={section.id} className="relative">
            <PortfolioSection {...section} />
            {index < sections.length - 1 && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                <button
                  onClick={() => scrollToSection(sections[index + 1].id)}
                  className="p-3 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                  aria-label="Scroll to next section"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
