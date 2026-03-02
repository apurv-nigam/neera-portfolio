import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { supabase, getPublicImageUrl } from '../lib/supabase';
import ImageModal from '../components/gallery/ImageModal';

const ArtworkPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialView = searchParams.get('view') === 'original' ? 1 : 0;

  useEffect(() => {
    const fetchArtwork = async () => {
      const { data, error: fetchError } = await supabase
        .from('artworks')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        setError('Artwork not found');
      } else {
        setArtwork({
          ...data,
          url: getPublicImageUrl(data.image_path),
          originalUrl: data.original_image_path
            ? getPublicImageUrl(data.original_image_path)
            : null,
        });
      }
      setLoading(false);
    };

    fetchArtwork();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream gap-4">
        <p className="text-warm-gray-500">Artwork not found</p>
        <a href="/" className="text-accent hover:underline">Go to gallery</a>
      </div>
    );
  }

  return (
    <ImageModal
      images={[artwork]}
      currentIndex={0}
      initialInnerSlide={initialView}
      onClose={() => navigate('/')}
    />
  );
};

export default ArtworkPage;
