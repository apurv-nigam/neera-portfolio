# Neera Nigam - Artist Portfolio

A modern, responsive artist portfolio showcasing realistic oil paintings and watercolors by Neera Nigam.

**Live site:** [neeras.netlify.app](https://neeras.netlify.app)

## Features

- Full-screen hero with auto-rotating artwork slideshow
- Filterable gallery (All / Oil Colors / Watercolor) with lazy-loaded images
- Mobile-first design with hamburger menu and touch swipe support
- Image modal with keyboard navigation, swipe gestures, and always-visible controls
- Scroll-triggered animations
- Warm, earthy color palette with Playfair Display and Inter typography

## Tech Stack

- **React 18** + **Vite** — fast dev/build tooling
- **Tailwind CSS** — utility-first styling with custom warm theme
- **Lucide React** — lightweight icons
- No additional runtime dependencies — uses native browser APIs for intersection observer, touch events, and animations

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  components/
    gallery/       # FilterBar, ImageCard, ImageModal
    layout/        # Navbar, Footer
    sections/      # HeroSection, GallerySection, AboutSection, ContactSection
    ui/            # AnimateOnScroll, LazyImage
  data/
    artworks.js    # Centralized artwork data
  hooks/
    useIntersectionObserver.js
    useSwipe.js
```

## Contact

- **Email:** neeranigam16@gmail.com
- **Instagram:** [@neeras.creations](https://instagram.com/neeras.creations)
