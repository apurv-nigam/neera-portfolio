import { useRef } from "react";

export function useSwipe(onSwipeLeft, onSwipeRight) {
  const touchStart = useRef(null);
  const touchEnd = useRef(null);
  const isPinching = useRef(false);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    if (e.touches.length > 1) {
      isPinching.current = true;
      return;
    }
    isPinching.current = false;
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    if (e.touches.length > 1) {
      isPinching.current = true;
      return;
    }
    if (isPinching.current) return;
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (isPinching.current) {
      isPinching.current = false;
      touchStart.current = null;
      touchEnd.current = null;
      return;
    }
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
    touchStart.current = null;
    touchEnd.current = null;
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
}
