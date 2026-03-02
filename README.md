# Neera Nigam - Artist Portfolio

A modern, responsive artist portfolio showcasing realistic oil paintings and watercolors by Neera Nigam. Features a dynamic backend powered by Supabase for artwork management, with a mobile-friendly admin dashboard.

**Live site:** [neeras.netlify.app](https://neeras.netlify.app)

## Features

### Public Site
- Full-screen hero with auto-rotating featured artwork slideshow
- Filterable gallery (All / Oil Colors / Watercolor) with lazy-loaded images
- Image modal with keyboard navigation, swipe gestures, and always-visible controls
- Original reference image comparison — swipe between artwork and its source photo
- Shareable artwork links (`/artwork/:id`) with native mobile share sheet
- Mobile-first design with hamburger menu and touch swipe support
- Scroll-triggered animations
- Warm, earthy color palette with Playfair Display and Inter typography

### Admin Dashboard (`/admin`)
- Protected by Supabase Auth (email/password)
- Create, edit, and delete artworks with image upload
- Upload optional original reference images for before/after comparison
- Set featured artworks, display order, and metadata
- Mobile-friendly — Neera can manage artworks from her phone

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Netlify                          │
│                   (Static Hosting)                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────┐  │
│  │  BrowserRouter│───▶│  PublicPage  │    │ ArtworkPage│  │
│  │  (App.jsx)  │    │  (/ route)   │    │(/artwork/:id)│ │
│  │             │    └──────┬───────┘    └─────┬─────┘  │
│  │             │           │                  │        │
│  │             │    ┌──────┴──────────────────┘        │
│  │             │    │                                  │
│  │             │    ▼                                  │
│  │             │  ┌─────────────────────────────┐     │
│  │             │  │      Public Components       │     │
│  │             │  │                              │     │
│  │             │  │  Navbar ─── Footer           │     │
│  │             │  │                              │     │
│  │             │  │  HeroSection                 │     │
│  │             │  │    └─ useArtworks('featured')│     │
│  │             │  │                              │     │
│  │             │  │  GallerySection              │     │
│  │             │  │    ├─ useArtworks(filter)    │     │
│  │             │  │    ├─ FilterBar              │     │
│  │             │  │    ├─ ImageCard[]            │     │
│  │             │  │    └─ ImageModal             │     │
│  │             │  │        ├─ Inner carousel     │     │
│  │             │  │        │  (artwork/original) │     │
│  │             │  │        ├─ Share button        │     │
│  │             │  │        └─ useSwipe           │     │
│  │             │  │                              │     │
│  │             │  │  AboutSection                │     │
│  │             │  │  ContactSection              │     │
│  │             │  └──────────────────────────────┘     │
│  │             │                                       │
│  │             │───▶┌────────────────────────────┐     │
│  │             │    │     Admin Components        │     │
│  │             │    │                             │     │
│  │             │    │  /admin/login → LoginForm   │     │
│  │             │    │                             │     │
│  │             │    │  /admin → ProtectedRoute    │     │
│  │             │    │    └─ AdminPage             │     │
│  │             │    │        ├─ AdminHeader       │     │
│  │             │    │        ├─ ArtworkForm       │     │
│  │             │    │        │   (create/edit)    │     │
│  │             │    │        └─ ArtworkList       │     │
│  │             │    │            (view/delete)    │     │
│  │             │    └────────────────────────────┘     │
│  └─────────────┘                                       │
│                                                         │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ Supabase JS Client
                         │ (src/lib/supabase.js)
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                      Supabase                           │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Database    │  │   Storage    │  │     Auth     │  │
│  │              │  │              │  │              │  │
│  │  artworks    │  │ artwork-     │  │  Email/      │  │
│  │  table       │  │ images       │  │  Password    │  │
│  │              │  │ bucket       │  │              │  │
│  │  - id        │  │              │  │  Admin user  │  │
│  │  - title     │  │  Artwork     │  │  (Neera)     │  │
│  │  - image_path│──│  images      │  │              │  │
│  │  - original_ │  │              │  │              │  │
│  │    image_path│──│  Original    │  │              │  │
│  │  - category  │  │  reference   │  │              │  │
│  │  - featured  │  │  images      │  │              │  │
│  │  - ...       │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
│  RLS Policies:                                          │
│  - Public: read artworks + images                       │
│  - Authenticated: full CRUD                             │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌──────────────┐     useArtworks(filter)     ┌──────────────┐
│              │ ──────────────────────────▶  │              │
│   React      │     { artworks, loading }   │   Supabase   │
│   Components │ ◀──────────────────────────  │   Database   │
│              │                              │              │
│              │     image_path               │              │
│              │ ─────────────────────────▶   │   Supabase   │
│              │     public URL               │   Storage    │
│              │ ◀─────────────────────────   │              │
└──────────────┘                              └──────────────┘

Fallback: If Supabase returns empty (env vars not set, DB empty),
components fall back to static data from src/data/artworks.js
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS (custom warm theme) |
| Icons | Lucide React |
| Backend | Supabase (Database + Storage + Auth) |
| Hosting | Netlify (static) |
| Routing | React Router DOM |

## Project Structure

```
src/
  lib/
    supabase.js          # Supabase client + getPublicImageUrl helper
  contexts/
    AuthContext.jsx       # Auth state, signIn/signOut
  hooks/
    useArtworks.js       # Fetch artworks from Supabase with filter
    useIntersectionObserver.js
    useSwipe.js
  pages/
    PublicPage.jsx       # Main site layout (/, all sections)
    ArtworkPage.jsx      # Shareable single artwork view (/artwork/:id)
    AdminPage.jsx        # Admin dashboard (/admin)
    MigratePage.jsx      # One-time data migration tool (/migrate)
  components/
    admin/
      ProtectedRoute.jsx # Auth guard → redirects to login
      LoginForm.jsx      # Admin login page
      AdminHeader.jsx    # Admin navbar (logout, view site)
      ArtworkForm.jsx    # Create/edit form with image upload
      ArtworkList.jsx    # Artwork list with edit/delete
    gallery/
      FilterBar.jsx      # Category filter pills
      ImageCard.jsx      # Gallery grid card
      ImageModal.jsx     # Full-screen viewer with swipe, share, original comparison
    layout/
      Navbar.jsx         # Site navigation
      Footer.jsx         # Site footer
    sections/
      HeroSection.jsx    # Hero slideshow (featured artworks)
      GallerySection.jsx # Filterable gallery grid
      AboutSection.jsx   # Artist bio
      ContactSection.jsx # Contact info
    ui/
      AnimateOnScroll.jsx
      LazyImage.jsx
  data/
    artworks.js          # Static fallback data
```

## Getting Started

### Prerequisites
- Node.js 18+
- A Supabase project (free tier works)

### Setup

```bash
# Install dependencies
npm install

# Copy env template and fill in your Supabase credentials
cp .env.local.example .env.local

# Start dev server
npm run dev

# Build for production
npm run build
```

### Environment Variables

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Set these in Netlify dashboard for production.

### Database Setup

Run in Supabase SQL Editor:

```sql
CREATE TABLE artworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  medium TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('oil', 'watercolor')),
  size TEXT NOT NULL,
  surface TEXT NOT NULL,
  year TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  image_path TEXT NOT NULL,
  original_image_path TEXT,
  display_order INTEGER
);

ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON artworks FOR SELECT TO public USING (true);
CREATE POLICY "Auth insert" ON artworks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update" ON artworks FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete" ON artworks FOR DELETE TO authenticated USING (true);
```

Create a storage bucket called `artwork-images` (set to public) and add storage policies:

```sql
CREATE POLICY "Public read" ON storage.objects FOR SELECT TO public USING (bucket_id = 'artwork-images');
CREATE POLICY "Auth upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'artwork-images');
CREATE POLICY "Auth update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'artwork-images');
CREATE POLICY "Auth delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'artwork-images');
```

## Contact

- **Email:** neeranigam16@gmail.com
- **Instagram:** [@neeras.creations](https://instagram.com/neeras.creations)
