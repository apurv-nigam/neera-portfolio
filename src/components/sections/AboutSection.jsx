import { aboutContent } from "../../data/artworks";
import AnimateOnScroll from "../ui/AnimateOnScroll";
import LazyImage from "../ui/LazyImage";

const AboutSection = () => {
  const { title, bio, extended, image, stats } = aboutContent;

  return (
    <section id="about" className="py-20 md:py-28 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <AnimateOnScroll>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <LazyImage
                src={image}
                alt="Neera Nigam"
                className="w-full h-auto object-cover"
              />
            </div>
          </AnimateOnScroll>

          {/* Text */}
          <div>
            <AnimateOnScroll delay={100}>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-warm-gray-800">
                {title}
              </h2>
              <div className="w-12 h-px bg-accent mt-4 mb-6" />
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <p className="text-warm-gray-600 leading-relaxed text-lg">
                {bio}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <p className="text-warm-gray-600 leading-relaxed text-lg mt-4">
                {extended}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={400}>
              <div className="flex gap-12 mt-8">
                <div>
                  <span className="block font-serif text-3xl font-bold text-accent">
                    {stats.experience}
                  </span>
                  <span className="text-sm text-warm-gray-500 uppercase tracking-wider">
                    Years Experience
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-3xl font-bold text-accent">
                    {stats.artworks}
                  </span>
                  <span className="text-sm text-warm-gray-500 uppercase tracking-wider">
                    Artworks Created
                  </span>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
