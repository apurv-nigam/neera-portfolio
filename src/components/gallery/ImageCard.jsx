import AnimateOnScroll from "../ui/AnimateOnScroll";
import LazyImage from "../ui/LazyImage";

const ImageCard = ({ artwork, index, onClick }) => {
  return (
    <AnimateOnScroll delay={index * 100}>
      <button
        onClick={onClick}
        className="group block w-full text-left rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <LazyImage
            src={artwork.url}
            alt={artwork.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <h3 className="font-serif text-lg font-semibold text-warm-gray-800">
            {artwork.title}
          </h3>
          <p className="text-sm text-warm-gray-500 mt-1">
            {artwork.medium} &middot; {artwork.year}
          </p>
        </div>
      </button>
    </AnimateOnScroll>
  );
};

export default ImageCard;
