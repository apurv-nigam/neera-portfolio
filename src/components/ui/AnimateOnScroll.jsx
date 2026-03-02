import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const AnimateOnScroll = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
